const { ApolloServer, makeExecutableSchema, gql, GraphQLUpload } = require('apollo-server-express');

const TypeDefs = require('./types');
const QueryDefs = require('./queries');
const MutationDefs = require('./mutations');
const Resolvers = require('./resolvers');

const RootDef = gql`
  type Query {
    noop: String
  }

  type Mutation {
    noop: String
  }
`;

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    noop: () => "",
    ...Resolvers.Query
  },
  Mutation: {
    noop: () => "",
    ...Resolvers.Mutation   
  }
};

const schema = makeExecutableSchema({
  typeDefs: [
    ...TypeDefs,
    RootDef,
    ...QueryDefs,
    ...MutationDefs
  ],
  resolvers
})

module.exports = new ApolloServer({ schema });