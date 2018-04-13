import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import CommentSchema from 'Root/graphql/query/comment/schema';
import UserSchema from 'Root/graphql/query/user/schema';
import resolveComment from './resolves/comment';
import resolve from './resolves/user';

const ArticleSchema = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    minutes: {
      type: GraphQLInt
    },
    avatar: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    },
    viewers: {
      type: GraphQLInt
    },
    likes: {
      type: GraphQLInt
    },
    type: {
      type: GraphQLInt
    },
    user: {
      type: UserSchema,
      resolve
    },
    comments: {
      type: new GraphQLList(CommentSchema),
      resolve: resolveComment
    }
  })
});

export default ArticleSchema;
