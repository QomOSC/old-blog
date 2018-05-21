import { Router } from 'express';

import Article from 'Root/models/Article';

import { logged } from 'Root/perms';

const router = new Router();


router.post('/article/like', logged, async (req, res) => {
  if (!req.session.user || !req.body._id) {
    res.json({ type: 4 });

    return;
  }

  try {
    const article = await Article.findById(req.body._id);

    if (!article) {
      res.json({ type: 2 });

      return;
    }

    if (article.likes.includes(req.session.user)) {
      res.json({ type: 0 });

      return;
    }

    article.likes.push(req.session.user);

    await article.save();

    res.json({ type: 0 });
  }

  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
