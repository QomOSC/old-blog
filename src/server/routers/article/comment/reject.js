import { Router } from 'express';

import Comment from 'Root/models/Comment';

const router = new Router();


router.post('/article/comment/reject', async (req, res) => {
  if (!req.session.user || !req.body._id) {
    res.json({ type: 4 });

    return;
  }

  const comment = await Comment.findOne({
    author: req.session.user,
    _id: req.body._id,
    type: 1
  });

  if (!comment) {
    res.json({ type: 2 });

    return;
  }

  try {
    await comment.remove();

    res.json({ type: 0 });
  }

  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
