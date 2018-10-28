const { gql } = require('apollo-server-express');

const FileQuery = gql`
  extend type Query {
    files: [File]
  }
`;

module.exports = FileQuery;