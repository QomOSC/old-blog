import { Router } from 'express';

import Article from 'Root/models/Article';

import { admin } from 'Root/perms';

const router = new Router();

router.post('/panel/articles/accept', admin, async (req, res) => {
  try {
    const article = await Article.findById(req.body._id);

    if (!article) {
      res.json({ type: 2, text: 0 });
      return;
    }

    article.type = 2;
    article.title = req.body.title;
    article.content = req.body.content;
    article.minutes = req.body.minutes;

    await article.save();

    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 0 });
  }
});

export default router;
