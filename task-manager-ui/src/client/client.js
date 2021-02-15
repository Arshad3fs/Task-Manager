import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache: cache,
  uri: 'http://localhost:4000/graphql',
  name: 'task-manager-client',
  version: '1.3',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;