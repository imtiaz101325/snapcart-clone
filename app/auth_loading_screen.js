import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
} from 'react-native';

class AuthLoadingScreen extends React.Component {
  async componentDidMount() {
    const userToken = await AsyncStorage.getItem('googleid');

    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <Container>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </Container>
    );
  }
}

export default AuthLoadingScreen;