import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import styled from 'styled-components/native';

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

  snap = async () => {
    if (this.camera) {
      console.log(this.camera)
      try {
        let photo = await this.camera.current.takePictureAsync();
        console.log(photo)
      } catch(err) {
        console.log(err)
      }
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <Container>
          <StyledCamera type={this.state.type} innerRef={this.camera}>
            <StyledTouchableOpacity onPress={this.snap}></StyledTouchableOpacity>
          </StyledCamera>
        </Container>
      );
    }
  }
}