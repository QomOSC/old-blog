import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

export default query => new Promise((resolve, reject) => {
  const link = createHttpLink({
    uri: '/graphql',
    credentials: 'same-origin'
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
  });

  client.query({
    query: gql(query)
  })
  .then(data => {
    resolve(data);
  }).catch(e => {
    reject(e);
  });
});
