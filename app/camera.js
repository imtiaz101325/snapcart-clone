import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
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
    id: null
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async (singleUpload) => {
    if (this.camera) {
      try {
        const photo = await this.camera.current.takePictureAsync();
        const id = null
        if (this.state.id) {
          id = this.state.id;
        } else {
          id = await AsyncStorage.getItem('googleid');
        }

        const uri = photo.uri;
        const patharr = uri.split('/');
        const name = patharr[patharr.length - 1];
        
        const file = new ReactNativeFile({
          uri,
          name,
          type: 'image/jpeg'
        });

        singleUpload({
          variables: { 
            file,
            userid: id
        }});

        this.setState({
          id
        });
      } catch(err) {
        console.log(err)
      }
    }
  };

  render() {
    const SINGLE_UPLOAD = gql`
      mutation SingleUpload($file: Upload!, $userid: ID!) {
        singleUpload(file: $file, userid: $userid)
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