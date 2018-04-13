import { GraphQLID, GraphQLInt } from 'graphql';

import resolve from './resolves/article';
import ArticleSchema from './schema';

const ArticleField = {
  type: ArticleSchema,
  args: {
    _id: {
      type: GraphQLID
    },
    type: {
      type: GraphQLInt
    }
  },
  resolve
};

export default ArticleField;
