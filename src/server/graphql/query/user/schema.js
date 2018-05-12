import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import ConferenceSchema from 'Root/graphql/query/conference/schema';
import ArticleSchema from 'Root/graphql/query/article/schema';
import resolveUserArticles from './resolves/userArticles';
import resolveConference from './resolves/conference';
import resolveArticle from './resolves/article';

export default new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLInt,
    },
    avatar: {
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLString,
    },
    articles: {
      type: GraphQLInt,
    },
    userArticles: {
      type: new GraphQLList(ArticleSchema),
      resolve: resolveUserArticles,
    },
    article: {
      type: ArticleSchema,
      args: {
        _id: {
          type: GraphQLID,
        },
      },
      resolve: resolveArticle,
    },
    conferences: {
      type: new GraphQLList(ConferenceSchema),
      args: {
        type: {
          type: GraphQLInt,
        },
      },
      resolve: resolveConference,
    },
  })
});
