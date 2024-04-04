import { Client, cacheExchange, fetchExchange } from 'urql';

export const URQL_CLIENT = new Client({
  url: process.env.REACT_APP_WEB_SERVICE_URL,
  exchanges: [cacheExchange, fetchExchange],
});