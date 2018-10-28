const { ApolloServer, gql } = require('apollo-server-express');

const knex = require('../database');
const userMethods = require('../database/user');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`

  type User {
    id: ID,
    googleid: ID! 
    name: String!
    email: String!
    photo_url: String
  }

  type Query {
    user(id: ID!, type: String!): User!
    users: [User]
  }

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

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    user: (_, { id, type }) => knex('users').where(type, id).then( res => res[0] ),
    users: () => knex.select().from('users'),
  },
  Mutation: {
    upsertUser: (_, { id, type, user }) => userMethods.upsert(id, type, user)
  }
};

module.exports = new ApolloServer({ typeDefs, resolvers });