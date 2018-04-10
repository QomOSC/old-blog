import { Router } from 'express';

import Article from 'Root/models/Article';

import { logged } from 'Root/perms';

const router = new Router();

router.post('/panel/articles/edit', logged, async (req, res) => {
  const article = await Article.findOne({
    _id: req.body.id,
    author: req.session.user
  });

  if (!article) {
    res.json({ type: 2 });
    return;
  }

  article.title = req.body.title;
  article.content = req.body.content;
  article.type = 1;

  try {
    await article.save();
    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
