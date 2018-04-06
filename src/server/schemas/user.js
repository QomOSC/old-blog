import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} from 'graphql';

import Article from 'Root/models/Article';

import ArticleSchema from './article';

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
      async resolve(parent) {
        const article = await Article
        .find({ author: parent._id })
        .sort({ createdAt: -1 })
        .lean();

        return article;
      }
    }
  })
});

export default UserSchema;
