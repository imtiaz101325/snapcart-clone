import React from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components/native';

const GET_USER = gql`
  query User($id: ID!, $type: String!) {
    user(id: $id, type: $type) {
      id
      googleid
      name
      email
      photo_url
    }
  }
`;

const UserImage = styled.Image`
  height: 64px;
  width: 64px;
`;

const Profile = ({ id }) => {
  return <Query query={GET_USER} variables={{ id, type: "googleid" }}>
    {
      ({ loading, error, data }) => {
        if(loading) return null;
        if(error) return <Text>error</Text>;

        const {
          name,
          profile_url
        } = data.user;
        
        return <View>
          <UserImage source={{ uri: profile_url }} />
          <Text>{name}</Text>  
        </View>
      }
    }    
  </Query>
}

export default Profile;