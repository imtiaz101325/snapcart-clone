import React from 'react';
import { ApolloProvider } from "react-apollo";

import StackNavigator from './create_switch_navigator';
import client from './apollo_client';

export default () => (
  <ApolloProvider client={client}>
    <StackNavigator />
  </ApolloProvider>
)