import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const CLIENT = new ApolloClient({
  uri: process.env.REACT_APP_WEB_SERVICE_URL,
  cache: new InMemoryCache(),
});