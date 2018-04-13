import { Router } from 'express';

import Comment from 'Root/models/Comment';

const router = new Router();

router.post('/article/comment/send', async (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
    contact: false,
    article: req.body.id
  });

  try {
    await comment.save();

    res.json({ type: 0 });
  }
  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
