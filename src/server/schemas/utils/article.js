import Article from 'Root/models/Article';


export default (query, one = false) => new Promise(async res => {
  if (one) {
    try {
      const article = await Article.findOne(query).select('-__v').lean();

      article.viewers = article.viewers.length;
      article.likes = article.likes.length;

      res(article);
    }
    catch (e) {
      res({});
    }
  }
  else {
    try {
      const articles = await Article
      .find(query)
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

      for (const i of articles.keys()) {
        articles[i].viewers = articles[i].viewers.length;
        articles[i].likes = articles[i].likes.length;
      }

      res(articles);
    }
    catch (e) {
      res([]);
    }
  }
});
