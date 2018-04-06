import { Router } from 'express';

import Article from 'Root/models/Article';

import { admin } from 'Root/perms';

const router = new Router();

router.post('/panel/articles/accept', admin, async (req, res) => {
  try {
    const article = await Article.findById(req.body.id);

    if (!article) {
      res.json({ type: 2, text: 0 });
      return;
    }

    await article.remove();

    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 0 });
  }
});

export default router;
