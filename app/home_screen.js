import React from 'react';
import {
  AsyncStorage,  
  Button,
} from 'react-native';
import styled from 'styled-components/native';

import Container from './shared/container';
import Profile from './profile';

const HomeScreenContainer = styled(Container)`
  justify-content: space-between;
`;

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  state = {
    id: ""
  }

  async componentDidMount() {
    const id = await AsyncStorage.getItem('googleid');

    this.setState({
      id
    });
  }

  render() {
    const {
      id
    } = this.state;

    return (
      <HomeScreenContainer>
        {
          !!id && <Profile id={id} />         
        }
        <Button title="Take picture" onPress={
          () => {
            this.props.navigation.navigate('Camera');
          }
        } />
        <Button title="Sign Out" onPress={this._signOutAsync} />
      </HomeScreenContainer>
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