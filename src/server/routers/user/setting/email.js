import { Router } from 'express';

import User from 'Root/models/User';

import { logged } from 'Root/perms';

const router = new Router();

router.post('/panel/user/setting/email', logged, async (req, res) => {
  req.body.email = req.body.email.toLowerCase();

  const user = await User.findById(req.session.user);

  if (!user) {
    res.json({ type: 2, text: 0 });
  }

  const email = await User.findOne({ email: req.body.email });

  if (email) {
    res.json({ type: 2, text: 1 });
    return;
  }

  user.email = req.body.email;

  try {
    await user.save();

    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 2 });
  }
});

export default router;
