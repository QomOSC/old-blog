import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} from 'graphql';

import Article from 'Root/models/Article';
import User from 'Root/models/User';

import { ArticleSchema } from './article';

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
        .find({ author: parent._id, type: 2 })
        .sort({ createdAt: -1 })
        .lean();

        return article;
      }
    },
    article: {
      type: ArticleSchema,
      args: {
        id: {
          type: GraphQLID
        }
      },
      async resolve(parent, args, context) {
        try {
          const article = await Article.findOne({
            _id: args.id,
            author: context.req.session.user
          }).lean();

          return article;
        } catch (e) {
          return {};
        }
      }
    }
  })
});

const UserField = {
  type: UserSchema,
  args: {
    username: {
      type: GraphQLString
    }
  },
  async resolve(parent, args, context) {
    let user;

    if (!args.username) {
      user = await User
        .findById(context.req.session.user)
        .select('-password -__v -submembers')
        .lean();
    } else {
      user = await User
        .findOne({ username: args.username.toLowerCase() })
        .select('-password -__v -submembers')
        .lean();
    }

    if (user) {
      user = {
        ...user,
        articles: user.articles.length
      };
    }

    return user;
  }
};

export default {
  UserSchema,
  UserField
};
