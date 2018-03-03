import { Router } from 'express';

const { Comment, Article } = rootRequire('./models');

const router = new Router();

router.post('/article/:id/comment/add', async(req, res) => {
  const article = await Article.findOne({ _id: req.params.id });

  if (!article) {
    res.json({ type: 2, text: 1 });
    return;
  }

  const newComment = new Comment({
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
    contact: false,
    article: req.params.id,
    author: article.author
  });

  try {
    await newComment.save();
    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 0 });
  }
});

export default router;
