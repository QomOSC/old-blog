import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} from 'graphql';

import ConferenceSchema from 'Root/graphql/query/conference/schema';
import resolveConference from './resolves/conference';
import ArticleSchema from 'Root/graphql/query/article/schema';
import resolveUserArticles from './resolves/userArticles';
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
    },
    conferences: {
      type: new GraphQLList(ConferenceSchema),
      args: {
        type: {
          type: GraphQLInt
        }
      },
      resolve: resolveConference
    }
  })
});

export default UserSchema;
