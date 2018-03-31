import { Router } from 'express';

import User from 'Root/models/User';

import { username } from 'Root/utils/validator';

import { logged } from 'Root/perms';

const router = new Router();

router.post('/panel/user/setting/username', logged, async (req, res) => {
  req.body.username = req.body.username.toLowerCase();

  const user = await User.findById(req.session.user);

  if (!user) {
    res.json({ type: 2, text: 0 });
  }

  if (!username(req.body.username)) {
    res.json({ type: 2, text: 3 });
    return;
  }

  const Username = await User.findOne({ username: req.body.username });

  if (Username) {
    res.json({ type: 2, text: 1 });
    return;
  }

  user.username = req.body.username;

  try {
    await user.save();

    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 2 });
  }
});

export default router;
