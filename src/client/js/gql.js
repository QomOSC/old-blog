import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import nprogress from 'nprogress';
import gql from 'graphql-tag';

export default query => new Promise((resolve, reject) => {
  nprogress.start();
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
    nprogress.done();
    resolve(data);
  }).catch(e => {
    reject(e);
  });
});
