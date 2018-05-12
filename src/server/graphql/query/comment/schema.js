import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import ArticleSchema from 'Root/graphql/query/article/schema';
import resolve from './resolve/article';

export default new GraphQLObjectType({
  name: 'Comment',
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
    description: {
      type: GraphQLString,
    },
    admin: {
      type: GraphQLString,
    },
    answer: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLInt,
    },
    contact: {
      type: GraphQLBoolean,
    },
    article: {
      type: GraphQLID,
    },
    articleData: {
      type: ArticleSchema,
      resolve,
    },
    author: {
      type: GraphQLID,
    },
    createdAt: {
      type: GraphQLString,
    },
  })
});
