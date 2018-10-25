const { ApolloServer, gql } = require('apollo-server-express');
const {
  GraphQLDateTime
} = require('graphql-iso-date');

const knex = require('../database');
const user = require('../database/user');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`

  scalar DateTime

  type User {
    id: ID,
    googleid: ID,
    name: String,
    email: String,
    photo_url: String,
    crated_at: DateTime,
  }

  type Query {
    users: [User]
  }

  type Mutation {
    upsertUser(id: ID, type: String): Response
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    users: () => knex.select().from('users'),
  },
  Mutation: {
    upsertUser: (id, type) => user.upsert(id, type)
  }
};

module.exports = new ApolloServer({ typeDefs, resolvers });