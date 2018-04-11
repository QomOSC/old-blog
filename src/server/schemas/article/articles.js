import { GraphQLList, GraphQLInt } from 'graphql';

import resolve from './resolves/article';
import ArticleSchema from './schema';

const ArticlesField = {
  type: new GraphQLList(ArticleSchema),
  args: {
    type: {
      type: GraphQLInt
    }
  },
  resolve
};

export default ArticlesField;
