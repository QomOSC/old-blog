import { Router } from 'express';

const { Article } = rootRequire('./models');
const { logged } = rootRequire('./perms');
const { shorten } = rootRequire('./utils');

const router = new Router();

router.get('/u', logged, async(req, res) => {

  const articles = await Article
  .find({ author: req.member.user._id, type: 2 })
  .select('-__v -minutes -embeds -type')
  .limit(9)
  .sort({ createdAt: -1 })
  .lean();
  
  for (const i of articles.keys()) {
    articles[i].content = shorten(articles[i].content);
    articles[i].viewers = articles[i].viewers.length;
    articles[i].likes = articles[i].likes.length;
  }

  res.render('u/u.njk', {
    articles
  });
});

export default router;
