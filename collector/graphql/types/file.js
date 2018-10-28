const { gql } = require('apollo-server-express');

const FileType =  gql`
  scalar Upload
  
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
`;

module.exports = FileType;