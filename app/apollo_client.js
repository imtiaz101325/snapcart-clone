import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
const { createUploadLink } = require('apollo-upload-client')

import clientState from './client_state';

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  ...clientState
});

module.exports = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    stateLink,
    new createUploadLink({
      uri: process.env.GRAPHQL_URI,
      credentials: 'same-origin'
    })
  ]),
  cache
});