import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import attendersLengthResolve from './resolves/attendersLength';
import attendersInfoResolve from './resolves/attendersInfo';
import UserSchema from 'Root/graphql/query/user/schema';
import resolveProviders from './resolves/providers';
import resolveAuthor from './resolves/author';

export default new GraphQLObjectType({
  name: 'Conference',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    start: {
      type: GraphQLString,
    },
    end: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLInt,
    },
    createdAt: {
      type: GraphQLString,
    },
    author: {
      type: GraphQLID,
    },
    authorInfo: {
      type: UserSchema,
      resolve: resolveAuthor,
    },
    providers: {
      type: new GraphQLList(GraphQLString),
    },
    done: {
      type: GraphQLBoolean,
    },
    embeds: {
      type: new GraphQLList(GraphQLString),
    },
    attenders: {
      type: new GraphQLList(GraphQLString),
    },
    attendersLength: {
      type: GraphQLInt,
      resolve: attendersLengthResolve,
    },
    attendersInfo: {
      type: new GraphQLList(UserSchema),
      resolve: attendersInfoResolve,
    },
    galleries: {
      type: new GraphQLList(GraphQLString),
    },
    providersInfo: {
      type: new GraphQLList(UserSchema),
      resolve: resolveProviders,
    },
  })
});
