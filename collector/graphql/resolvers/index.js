const UserResolver = require('./user');
const FileResolver = require('./file');

module.exports = {
  Query: {
    ...UserResolver.Query,
    ...FileResolver.Query,
  },
  Mutation: {
    ...UserResolver.Mutation,
    ...FileResolver.Mutation,
  }
}