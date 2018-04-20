import Article from 'Root/models/Article';

export default (query, one = false, limit) => new Promise(async res => {
  if (one) {
    try {
      const article = await Article
      .findOne(query)
      .select('-__v')
      .limit(limit)
      .lean();

      if (article) {
        article.likeLength = article.likes.length;
        article.viewerLength = article.viewers.length;
      }

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
      .limit(limit)
      .lean();

      for (const i of articles.keys()) {
        articles[i].viewerLength = articles[i].viewers.length;
        articles[i].likeLength = articles[i].likes.length;
      }

      res(articles);
    }
    catch (e) {
      res([]);
    }
  }
});
