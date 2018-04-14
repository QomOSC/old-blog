import { Router } from 'express';

import Comment from 'Root/models/Comment';

import { admin } from 'Root/perms';

const router = new Router();

router.post('/contact/accept', admin, async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.body._id, type: 1 });

    if (!comment) {
      res.json({ type: 2 });
      return;
    }

    comment.type = 2;
    comment.admin = req.session.user;

    if (req.body.answer) {
      comment.answer = req.body.answer;
    }

    await comment.save();

    res.json({ type: 0 });
  }
  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
