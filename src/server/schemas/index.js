import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import Article from 'Root/models/Article';
import User from 'Root/models/User';

import TagField from './tags';
import ArticleSchema from './article';
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
    },
    article: {
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
    },
    articles: {
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
    },
    tag: TagField
  }
});

const main = new GraphQLSchema({
  query: RootQuery
});

export default main;
