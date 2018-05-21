import { Router } from 'express';

import Comment from 'Root/models/Comment';

const router = new Router();


router.post('/article/comment/send', async (req, res) => {
  if (
    !req.body.description ||
    !req.session.user ||
    !req.body.email ||
    !req.body.name ||
    !req.body.id
  ) {
    res.json({ type: 4 });

    return;
  }

  const comment = new Comment({
    description: req.body.description,
    author: req.session.user,
    email: req.body.email,
    article: req.body.id,
    name: req.body.name,
    contact: false,
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
