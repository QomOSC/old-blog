import { GraphQLObjectType } from 'graphql';

import articles from './article/articles';
import article from './article/article';
import users from './user/users';
import user from './user/user';
import tag from './tag/tags';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    articles,
    article,
    users,
    user,
    tag
  }
});

export default query;
