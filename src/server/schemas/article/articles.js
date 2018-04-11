import { GraphQLList, GraphQLInt } from 'graphql';

import Article from 'Root/models/Article';

import ArticleSchema from './schema';

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

export default ArticlesField;
