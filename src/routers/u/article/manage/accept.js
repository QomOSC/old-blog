import { Router } from 'express';

const { Article } = rootRequire('./models');
const { logged, u } = rootRequire('./perms');

const router = new Router();

router.post(
  '/u/article/manage/:id/accept',
  logged, u.admin,
  async(req, res) => {

  const article = await Article.findOne({ _id: req.params.id, type: 1 });

  if (!article) {
    res.reply.error();
    return;
  }

  article.type = 2;
  article.content = req.body.content;
  article.title = req.body.title;

  try {
    await article.save();
    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
