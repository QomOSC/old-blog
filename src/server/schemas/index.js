import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLID
} from 'graphql';

import Article from 'Root/models/Article';
import User from 'Root/models/User';

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
        }
      },
      async resolve(parent, args) {
        try {
          const a = await Article.findById(args._id).lean();

          return a;
        } catch (e) {
          return {};
        }
      }
    },
    articles: {
      type: new GraphQLList(ArticleSchema),
      async resolve() {
        let arts = await Article
          .find()
          .select('-__v')
          .lean();

        for (const i of arts.keys()) {
          arts[i].viewers = arts[i].viewers.length;
          arts[i].likes = arts[i].likes.length;
        }

        return arts;
      }
    }
  }
});

const main = new GraphQLSchema({
  query: RootQuery
});

export default main;
