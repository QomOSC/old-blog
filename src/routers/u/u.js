import { Router } from 'express';

const { Article } = rootRequire('./models');
const { logged } = rootRequire('./perms');

const router = new Router();

router.get('/u', logged, async(req, res) => {

  const articles = await Article
  .find({ author: req.member.user._id, type: 2 })
  .limit(9)
  .sort({ createdAt: -1 });

  const allArticles = [];

  for (const i of articles) {

    const oneArticle = {};

    let content = i.content.split('').slice(0, 130);
    content.push('.', '.', '.');
    content = content.join('');

    oneArticle.id = i._id;
    oneArticle.title = i.title;
    oneArticle.content = content;
    oneArticle.minutes = i.minutes;
    oneArticle.avatar = i.avatar;
    oneArticle.viewers = i.viewers.length;
    oneArticle.likes = i.likes.length;

    allArticles.push(oneArticle);
  }

  res.render('u/u.njk', {
    articles: allArticles
  });
});

export default router;
