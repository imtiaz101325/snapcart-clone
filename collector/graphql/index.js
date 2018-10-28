const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');

const TypeDefs = require('./types');
const QueryDefs = require('./queries');
const MutationDefs = require('./mutations');

const knex = require('../database');
const userMethods = require('../database/user');

const resolvers = {
  Query: {
    user: (_, { id, type }) => knex('users').where(type, id).then( res => res[0] ),
    users: () => knex.select().from('users'),
  },
  Mutation: {
    upsertUser: (_, { id, type, user }) => userMethods.upsert(id, type, user)
  }
};

const schema = makeExecutableSchema({
  typeDefs: [
    ...TypeDefs,
    ...QueryDefs,
    ...MutationDefs
  ],
  resolvers
})

module.exports = new ApolloServer({ schema });