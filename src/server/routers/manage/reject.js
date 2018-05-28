import { Router } from 'express';

import User from 'Root/models/User';

import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';
import admin from 'Root/middlewares/permissions/admin';

const router = new Router();


router.post(
  '/panel/manage/reject',
  logged,
  admin,
  requirements(['_id']),
  async (req, res) => {

  try {
    const user = await User.findOne({ _id: req.body._id, type: 1 });

    if (!user) {
      return res.json({ type: 2 });
    }

    await user.remove();

    res.json({ type: 0 });
  }

  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
