import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';

import ArticleSchema from 'Root/graphql/query/article/schema';
import resolve from './resolves/articles';

export default new GraphQLObjectType({
  name: 'Tags',
  fields: () => ({
    tagname: {
      type: GraphQLString,
    },
    articles: {
      type: new GraphQLList(ArticleSchema),
      resolve,
    },
  })
});
