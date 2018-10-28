const { gql } = require('apollo-server-express');

const UserType = gql`
  type User {
    id: ID,
    googleid: ID! 
    name: String!
    email: String!
    photo_url: String
  }
`;

module.exports = UserType