import { GraphQLInt, GraphQLID } from 'graphql';

import resolve from './resolves/article';
import ArticleSchema from './schema';

export default {
  type: ArticleSchema,
  args: {
    _id: {
      type: GraphQLID,
    },
    type: {
      type: GraphQLInt,
    },
  },
  resolve,
};
