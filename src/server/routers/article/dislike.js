import { Router } from 'express';

import Article from 'Root/models/Article';

import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';

const router = new Router();


router.post(
  '/article/dislike',
  logged,
  requirements(['_id']),
  async (req, res) => {

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
