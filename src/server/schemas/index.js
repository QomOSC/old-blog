import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID
} from 'graphql';

import Article from 'Root/models/Article';
import User from 'Root/models/User';

import ArticleSchema from './article';
import UserSchema from './user';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserSchema,
      args: {
        username: {
          type: GraphQLString
        }
      },
      async resolve(parent, args) {
        let user = await User
          .findOne({ username: args.username })
          .select('-password -__v -submembers')
          .lean();

        user = {
          ...user,
          createdAt: +user.createdAt,
          articles: user.articles.length
        };

        return user;
      }
    },
    article: {
      type: ArticleSchema,
      args: {
        _id: {
          type: GraphQLID
        }
      },
      async resolve(parent, args) {
        const a = await Article.findOne({ _id: args._id }).lean();

        return a;
      }
    }
  }
});

const main = new GraphQLSchema({
  query: RootQuery
});

export default main;
