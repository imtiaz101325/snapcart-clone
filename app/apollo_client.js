import ApolloClient from "apollo-boost";
import { InMemoryCache } from 'apollo-cache-inmemory';

import clientState from './client_state';

const cache = new InMemoryCache();

module.exports = new ApolloClient({
  uri: "http://192.168.2.100:4000/graphql",
  cache,
  clientState,
});