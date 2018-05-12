import { GraphQLList, GraphQLInt } from 'graphql';

import resolve from './resolves/articles';
import ArticleSchema from './schema';

export default {
  type: new GraphQLList(ArticleSchema),
  args: {
    type: {
      type: GraphQLInt,
    },
    limit: {
      type: GraphQLInt,
    },
  },
  resolve,
};
