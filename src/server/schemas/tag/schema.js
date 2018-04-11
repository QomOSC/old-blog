import {
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} from 'graphql';

import Article from 'Root/models/Article';
import Tag from 'Root/models/Tag';

import ArticleSchema from 'Root/schemas/article/schema';

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

          if (article) {
            article.viewers = article.viewers.length;
            article.likes = article.likes.length;
          }

          articles.push(article);
        }

        return articles;
      }
    }
  })
});

export default TagsSchema;
