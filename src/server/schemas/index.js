import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

import User from 'Root/models/User';

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
    }
  }
});

const main = new GraphQLSchema({
  query: RootQuery
});

export default main;
