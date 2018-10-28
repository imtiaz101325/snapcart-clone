const { gql } = require('apollo-server-express');

const FileMutation = gql`
  extend type Mutation {
    singleUpload(file: Upload!): File!
  }
`;

module.exports = FileMutation;