import { Router } from 'express';

import Article from 'Root/models/Article';

import { logged } from 'Root/perms';

const router = new Router();

router.post('/panel/articles/edit/check', logged, async (req, res) => {
  try {
    const article = await Article.findOne({
      _id: req.body.id,
      author: req.session.user
    });

    if (article) {
      res.json({ type: 0 });
      return;
    }

    res.json({ type: 2 });
  } catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
