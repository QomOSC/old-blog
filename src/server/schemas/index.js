import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import query from './query';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',

});

const main = new GraphQLSchema({
  query
});

export default main;
