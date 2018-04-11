import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import articles from './article/articles';
import article from './article/article';
import user from './user/user';
import tag from './tag/tags';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    articles,
    article,
    user,
    tag
  }
});

const main = new GraphQLSchema({
  query: RootQuery
});

export default main;
