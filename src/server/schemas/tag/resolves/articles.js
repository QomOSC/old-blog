import Article from 'Root/models/Article';
import Tag from 'Root/models/Tag';

const resolve = async parent => {
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
};

export default resolve;
