const { gql } = require('apollo-server-express');

const UserMutation = gql`
  input userInput {
    googleid: ID!
    name: String!
    email: String!
    photo_url: String!
  }

  type Mutation {
    upsertUser(id: ID!, type: String!, user: userInput! ): User!
  }
`;

module.exports = UserMutation;