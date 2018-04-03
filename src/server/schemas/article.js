import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import User from 'Root/models/User';

import UserSchema from './user';

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
      async resolve(parent) {
        let user = await User
          .findOne({ _id: parent.author })
          .select('-password -submembers -__v')
          .lean();

        if (user) {
          user = {
            ...user,
            articles: user.articles.length
          };
        }

        return user;
      }
    }
  })
});

export default ArticleSchema;
