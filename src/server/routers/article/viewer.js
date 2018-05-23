import { Router } from 'express';

import Article from 'Root/models/Article';

import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';

const router = new Router();


router.post(
  '/article/viewer',
  logged,
  requirements(['_id']),
  async (req, res) => {

  try {
    const article = await Article.findById(req.body._id);

    if (!article) {
      res.json({ type: 2 });

      return;
    }

    if (article.viewers.includes(req.body.ip)) {
      res.json({ type: 0, text: 1 });

      return;
    }

    article.viewers.push(req.body.ip);

    await article.save();

    res.json({ type: 0, text: 0 });
  }

  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
