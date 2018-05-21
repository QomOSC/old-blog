import { Router } from 'express';

import Comment from 'Root/models/Comment';

import { admin } from 'Root/perms';

const router = new Router();


router.post('/contact/reject', admin, async (req, res) => {
  if (!req.body._id) {
    res.json({ type: 4 });

    return;
  }

  try {
    const comment = await Comment.findOne({ _id: req.body._id, type: 1 });

    if (!comment) {
      res.json({ type: 2 });

      return;
    }

    await comment.remove();

    res.json({ type: 0 });
  }
  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
