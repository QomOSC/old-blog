import { GraphQLSchema } from 'graphql';

import query from './query';
import mutation from './mutation';

const main = new GraphQLSchema({
  query,
  mutation
});

export default main;
