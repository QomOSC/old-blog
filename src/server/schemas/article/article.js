import { GraphQLID, GraphQLInt } from 'graphql';

import Article from 'Root/models/Article';

import ArticleSchema from './schema';

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

export default ArticleField;
