import gql from "graphql-tag";

const defaults = {
  user: {
    __typename: "User",
    id: "",
    googleid: "",
    email: "",
    name: "",
    photo_url: "",
  }
}

const resolvers = {
}

const typeDefs = gql`
  type User {
    id: ID
    googleid: ID!
    email: String!
    name: String!
    photo_url: String
  }

  type Query {
    user(id: ID!, type: String!): User!
  }

  type Mutation {
    googleAuth: User!
  }
`;

export default {
  defaults,
  resolvers,
  typeDefs
}