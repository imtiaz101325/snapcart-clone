const { gql } = require('apollo-server-express');

const UserQuery = gql`
  extend type Query {
    user(id: ID!, type: String!): User!
    users: [User]
  }
`;

module.exports = UserQuery;