import { Router } from 'express';

const { Article } = rootRequire('./models');
const { logged } = rootRequire('./perms');

const router = new Router();

router.get('/u/article', logged, async(req, res) => {

  const authorarticles = await Article
    .find({ author: req.member.user._id })
    .sort({ createdAt: -1 })
    .limit(9);

  if (authorarticles.length === 0) {
    res.render('u/article/all.njk', {
      empty: true
    });
  } else {

    const articles = [];

    for (const i of authorarticles) {

      let content = i.content.split('').slice(0, 130);
      content.push('.', '.', '.');
      content = content.join('');

      const onePost = {
        _id: i._id,
        title: i.title,
        likes: i.likes.length,
        viewers: i.viewers.length,
        avatar: i.avatar,
        content
      };

      articles.push(onePost);
    }

    res.render('u/article/all.njk', {
      posts: articles
    });
  }
});

export default router;
