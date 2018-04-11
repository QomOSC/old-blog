import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';

import Article from 'Root/models/Article';
import Tag from 'Root/models/Tag';

import { ArticleSchema } from './article';

const TagsSchema = new GraphQLObjectType({
  name: 'Tags',
  fields: () => ({
    tagname: {
      type: GraphQLString
    },
    articles: {
      type: new GraphQLList(ArticleSchema),
      async resolve(parent) {
        const tags = await Tag.find({ tagname: parent.tagname });

        const articles = [];

        for (const i of tags) {
          const article = await Article.findById(i.article).lean();

          articles.push(article);
        }

        return articles;
      }
    }
  })
});

const TagField = {
  type: TagsSchema,
  args: {
    tagname: {
      type: GraphQLString
    }
  },
  async resolve(parent, args) {
    const tag = await Tag.findOne({ tagname: args.tagname }).lean();

    return tag;
  }
};

export default {
  TagsSchema,
  TagField
};
