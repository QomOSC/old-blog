import { Router } from 'express';

const { Article } = rootRequire('./models');
const { logged } = rootRequire('./perms');
const { shorten } = rootRequire('./utils');

const router = new Router();

router.get('/u/article', logged, async(req, res) => {

  const articles = await Article
    .find({ author: req.member.user._id })
    .select('title likes viewers avatar content')
    .sort({ createdAt: -1 })
    .limit(9)
    .lean();

  if (!articles.length) {
    res.render('u/article/all.njk', {
      empty: true
    });
    return;
  }

  for (const i of articles.keys()) {
    articles[i].content = shorten(articles[i].content);
    articles[i].likes = articles[i].likes.length;
    articles[i].viewers = articles[i].viewers.length;
  }

  res.render('u/article/all.njk', {
    posts: articles
  });
});

export default router;
