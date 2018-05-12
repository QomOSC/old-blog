import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import CommentSchema from 'Root/graphql/query/comment/schema';
import UserSchema from 'Root/graphql/query/user/schema';
import TagSchema from 'Root/graphql/query/tag/schema';
import resolveComment from './resolves/comment';
import resolveLike from './resolves/like';
import resolveTag from './resolves/tag';
import resolve from './resolves/user';

export default new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    minutes: {
      type: GraphQLInt,
    },
    avatar: {
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLString,
    },
    viewerLength: {
      type: GraphQLInt,
    },
    likeLength: {
      type: GraphQLInt,
    },
    type: {
      type: GraphQLInt,
    },
    user: {
      type: UserSchema,
      resolve,
    },
    comments: {
      type: new GraphQLList(CommentSchema),
      resolve: resolveComment,
    },
    liked: {
      type: GraphQLBoolean,
      resolve: resolveLike,
    },
    tags: {
      type: new GraphQLList(TagSchema),
      resolve: resolveTag,
    },
  })
});
