import { Router } from 'express';

import User from 'Root/models/User';

import { admin } from 'Root/perms';

const router = new Router();

router.post('/panel/manage/reject', admin, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body._id, type: 1 });

    if (!user) {
      res.json({ type: 2 });
      return;
    }

    await user.remove();

    res.json({ type: 0 });
  }
  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
