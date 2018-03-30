import { Router } from 'express';

import User from 'Root/models/User';

import { logged } from 'Root/perms';

const router = new Router();

router.post('/panel/user/setting/name', logged, async (req, res) => {
  const user = await User.findById(req.session.user);

  if (!user) {
    res.json({ type: 2, text: 0 });
  }

  user.name = req.body.name;

  try {
    await user.save();

    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 1 });
  }
});

export default router;
