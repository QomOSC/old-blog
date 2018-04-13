import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} from 'graphql';

import resolveUserArticles from './resolves/userArticles';
import ArticleSchema from 'Root/schemas/article/schema';
import resolveArticle from './resolves/article';

const UserSchema = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    type: {
      type: GraphQLInt
    },
    avatar: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    },
    articles: {
      type: GraphQLInt
    },
    userArticles: {
      type: new GraphQLList(ArticleSchema),
      resolve: resolveUserArticles
    },
    article: {
      type: ArticleSchema,
      args: {
        _id: {
          type: GraphQLID
        }
      },
      resolve: resolveArticle
    }
  })
});

export default UserSchema;
