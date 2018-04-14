import { Router } from 'express';

import Comment from 'Root/models/Comment';

const router = new Router();

router.post('/article/comment/accept', async (req, res) => {
  const comment = await Comment.findOne({
    author: req.session.user,
    _id: req.body._id,
    type: 1
  });

  if (!comment) {
    res.json({ type: 2 });
    return;
  }

  comment.type = 2;

  if (req.body.answer) {
    comment.answer = req.body.answer;
  }

  try {
    await comment.save();
    res.json({ type: 0 });
  }
  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
