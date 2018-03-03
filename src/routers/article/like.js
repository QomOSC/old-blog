import { Router } from 'express';

const { Article } = rootRequire('./models');

const router = new Router();

router.post('/article/like/:id', async(req, res) => {
  if (!req.member.user) {
    // Not Logged in
    res.json({ type: 2, text: 1 });
    return;
  }

  const article = await Article.findOne({ _id: req.params.id });

  if (!article) {
    res.json({ type: 2, text: 0 });
    return;
  }

  if (article.likes.indexOf(req.member.user._id) !== -1) {
    // Duplicate
    res.json({ type: 0, text: 1 });
    return;
  }

  article.likes.push(req.member.user._id);

  try {
    await article.save();
    res.json({ type: 0, text: 0 });
  } catch (e) {
    res.json({ type: 2, text: 0 });
  }
});

export default router;
