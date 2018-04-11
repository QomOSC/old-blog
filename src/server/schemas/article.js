import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import Article from 'Root/models/Article';
import User from 'Root/models/User';

import { UserSchema } from './user';

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

const ArticleField = {
  type: ArticleSchema,
  args: {
    _id: {
      type: GraphQLID
    },
    type: {
      type: GraphQLInt
    }
  },
  async resolve(parent, args) {
    try {
      const a = await Article
      .findOne({
        _id: args._id,
        type: args.type || 2
      })
      .sort({ createdAt: -1 })
      .lean();

      return a;
    } catch (e) {
      return {};
    }
  }
};

const ArticlesField = {
  type: new GraphQLList(ArticleSchema),
  args: {
    type: {
      type: GraphQLInt
    }
  },
  async resolve(parent, args) {
    let arts = await Article
      .find({ type: args.type || 2 })
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    for (const i of arts.keys()) {
      arts[i].viewers = arts[i].viewers.length;
      arts[i].likes = arts[i].likes.length;
    }

    return arts;
  }
};

export default {
  ArticleSchema,
  ArticlesField,
  ArticleField
};
