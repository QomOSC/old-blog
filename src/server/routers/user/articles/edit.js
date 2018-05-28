import { Router } from 'express';

import Article from 'Root/models/Article';

import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';

const router = new Router();


router.post(
  '/panel/articles/edit',
  logged,
  requirements(['content', 'title', 'id']),
  async (req, res) => {

  const article = await Article.findOne({
    _id: req.body.id,
    author: req.session.user
  });

  if (!article) {
    return res.json({ type: 2 });
  }

  article.content = req.body.content;
  article.title = req.body.title;
  article.type = 1;

  try {
    await article.save();

    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
