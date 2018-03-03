import { Router } from 'express';

const { Article } = rootRequire('./models');

const router = new Router();

router.post('/article/dislike/:id', async(req, res) => {
  if (!req.member.user) {
    res.json({ type: 2, text: 1 });
    return;
  }

  const article = await Article.findOne({ _id: req.params.id });

  if (!article) {
    res.json({ type: 2, text: 0 });
    return;
  }

  if (article.likes.indexOf(req.member.user._id) === -1) {
    // Duplicate
    res.json({ type: 0, text: 1 });
    return;
  }

  article.likes.splice(req.member.user._id, 1);

  try {
    await article.save();
    res.json({ type: 0, text: 0 });
  } catch (e) {
    res.json({ type: 2, text: 0 });
  }
});

export default router;
