import { Router } from 'express';

import Article from 'Root/models/Article';

import { logged } from 'Root/perms';

const router = new Router();


router.post('/article/dislike', logged, async (req, res) => {
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

    if (!article.likes.includes(req.session.user)) {
      res.json({ type: 2 });

      return;
    }

    article.likes.splice(req.session.user, 1);

    await article.save();

    res.json({ type: 0 });
  }

  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
