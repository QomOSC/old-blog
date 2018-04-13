import {
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} from 'graphql';

import resolve from './resolves/articles';
import ArticleSchema from 'Root/schemas/query/article/schema';

const TagsSchema = new GraphQLObjectType({
  name: 'Tags',
  fields: () => ({
    tagname: {
      type: GraphQLString
    },
    articles: {
      type: new GraphQLList(ArticleSchema),
      resolve
    }
  })
});

export default TagsSchema;
