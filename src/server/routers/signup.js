import { Router } from 'express';

import Newsletter from 'Root/models/Newsletter';
import User from 'Root/models/User';

import { hmac } from 'Root/utils/crypto';
import config from 'Root/config';
import { login } from 'Root/perms';

const router = new Router();


router.post('/signup', login, async (req, res) => {
  req.body.username = req.body.username.toLowerCase();
  req.body.email = req.body.email.toLowerCase();

  const email = await User.findOne({ email: req.body.email });

  if (email) {
    res.json({ type: 2, text: 1 });
    return;
  }

  const username = await User.findOne({ username: req.body.username });

  if (username) {
    res.json({ type: 2, text: 2 });
    return;
  }

  const user = new User({
    ...req.body,
    password: hmac(req.body.password, config.dbkey)
  });

  try {
    await user.save();
  } catch (e) {
    res.json({ type: 2, text: 3 });
    return;
  }

  let newsletter = await Newsletter.findOne({
    email: req.body.email
  });

  if (newsletter) {
    res.json({ type: 0 });
    return;
  }


  newsletter = new Newsletter({
    email: req.body.email
  });

  try {
    await newsletter.save();
    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 3 });
  }
});

export default router;
