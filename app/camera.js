import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera, Permissions } from 'expo';
import styled from 'styled-components/native';
import { ReactNativeFile } from 'apollo-upload-client';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Container from './shared/container';

const StyledCamera = styled(Camera)`
  flex: 1;
`;

const StyledTouchableOpacity = styled(TouchableOpacity)`
  flex: 1;
  background-color: transparent;
`;

export default class CameraExample extends React.Component {
  constructor(props) {
    super(props);

    this.camera = React.createRef();
  }

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async (singleUpload) => {
    if (this.camera) {
      try {
        let photo = await this.camera.current.takePictureAsync();
        console.log(photo)

        const file = new ReactNativeFile({
          uri: photo.uri,
          name: 'some_name.jpg',
          type: 'image/jpeg'
        });

        singleUpload(file);

      } catch(err) {
        console.log(err)
      }
    }
  };

  render() {
    const SINGLE_UPLOAD = gql`
      mutation SingleUpload($file: Upload!) {
        singleUpload(file: $file) {
          filename
        }
      }
    `;

    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <Container>
          <StyledCamera type={this.state.type} innerRef={this.camera}>
            <Mutation mutation={SINGLE_UPLOAD} >
              {
                (singleUpload, { loading, error }) =>
                  loading ?
                    <ActivityIndicator /> :
                    <StyledTouchableOpacity onPress={() => this.snap(singleUpload)}></StyledTouchableOpacity>
              }
            </Mutation>
          </StyledCamera>
        </Container>
      );
    }
  }
}