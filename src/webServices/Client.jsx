import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export function CLIENT() {
  const uriWebService = process.env.REACT_APP_WEB_SERVICE_URL
  if(!uriWebService){
    console.error("url web service no found: REACT_APP_WEB_SERVICE_URL");
  }

  return new ApolloClient({
    uri: uriWebService,
    cache: new InMemoryCache(),
  });

}