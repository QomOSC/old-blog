import { Router } from 'express';

import User from 'Root/models/User';

import { username } from 'Root/utils/validator';
import { logged } from 'Root/perms';

const router = new Router();


router.post('/panel/user/setting/username', logged, async (req, res) => {
  if (!req.body.username || !req.session.user) {
    res.json({ type: 4 });

    return;
  }

  req.body.username = req.body.username.toLowerCase();

  const user = await User.findById(req.session.user);

  if (!username(req.body.username)) {
    res.json({ type: 2, text: 3 });

    return;
  }

  const checkUsername = await User.findOne({ username: req.body.username });

  if (checkUsername) {
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
