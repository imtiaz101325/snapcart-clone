const { gql } = require('apollo-server-express');

const FileMutation = gql`
  extend type Mutation {
    singleUpload(file: Upload!, userid: ID!): ID!
  }
`;

module.exports = FileMutation;