import { GraphQLObjectType } from 'graphql';

import conferences from './conference/conferences';
import conference from './conference/conference';
import articles from './article/articles';
import article from './article/article';
import comment from './comment/comment';
import users from './user/users';
import user from './user/user';
import tag from './tag/tags';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    conferences,
    conference,
    articles,
    article,
    comment,
    users,
    user,
    tag,
  },
});
