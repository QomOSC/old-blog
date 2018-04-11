import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { ArticlesField, ArticleField } from './article';
import { UserField } from './user';
import { TagField } from './tags';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    articles: ArticlesField,
    article: ArticleField,
    user: UserField,
    tag: TagField
  }
});

const main = new GraphQLSchema({
  query: RootQuery
});

export default main;
