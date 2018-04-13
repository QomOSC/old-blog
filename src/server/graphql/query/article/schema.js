import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import UserSchema from 'Root/graphql/query/user/schema';
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
    }
  })
});

export default ArticleSchema;
