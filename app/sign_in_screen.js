import React from 'react';
import {
  AsyncStorage,
  Button,
} from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const AUTH = gql`
  mutation UpsertUser($id: ID!, $type: String!, $user: userInput! ) {
    upsertUser(id: $id, type: $type, user: $user) {
      googleid
    }
  }
`;

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  state = {
    error: false,
    canceled: false
  }

  render() {
    const {
      navigation
    } = this.props;

    return <Container>
      <Mutation mutation={AUTH} update={ async (_,{ data }) => {
        await AsyncStorage.setItem('googleid', data.upsertUser.googleid);
        navigation.navigate('App'); 
      }}>
        {
          upsertUser => 
            <Button title="Sign in!" onPress={() => this._signInAsync(upsertUser) } />
        }
      </Mutation>
    </Container>
  }

  _signInAsync = async (mutation) => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: process.env.GOOGLE_AUTH_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        if (!result.error && !result.cancelled) {
          const {
            id: googleid,
            name,
            email,
            photoUrl: photo_url,
          } = result.user;

          mutation({
            variables: {
              id: googleid, 
              type: 'googleid', 
              user: {              
                googleid,
                name,
                email,
                photo_url,
              }
            }
          });
        }
      } else {
        this.setState({ cancelled: true });
      }
    } catch(e) {
      this.setState({ error: true });
    }
  }
}

export default SignInScreen;