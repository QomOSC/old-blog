import { Router } from 'express';

import Comment from 'Root/models/Comment';

import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';
import admin from 'Root/middlewares/permissions/admin';

const router = new Router();


router.post(
  '/contact/reject',
  logged,
  admin,
  requirements(['_id']),
  async (req, res) => {

  try {
    const comment = await Comment.findOne({ _id: req.body._id, type: 1 });

    if (!comment) {
      return res.json({ type: 2 });
    }

    await comment.remove();

    res.json({ type: 0 });
  }
  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
