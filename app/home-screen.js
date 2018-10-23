import React from 'react';
import {
  AsyncStorage,  
  Button,
} from 'react-native';

import Container from './shared/container';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <Container>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
        <Button title="Bring up the camera" onPress={
          () => {
            this.props.navigation.navigate('Camera');
          }
        } />
      </Container>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

export default HomeScreen;