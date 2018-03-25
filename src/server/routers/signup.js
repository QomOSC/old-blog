import { Router } from 'express';

import Newsletter from 'Root/models/Newsletter';
import Captcha from 'Root/models/Captcha';
import User from 'Root/models/User';

import { hmac } from 'Root/utils/crypto';
import config from 'Root/config';

const router = new Router();

router.post('/signup', async (req, res) => {
  const captcha = Captcha.findOne({ _id: req.body.data.captchaToken });

  if (captcha !== req.body.captcha.toLowerCase()) {
    res.json({ type: 2, text: 0 });

    return;
  }

  captcha.remove();

  req.body.data.username = req.body.data.username.toLowerCase();
  req.body.data.email = req.body.data.email.toLowerCase();

  const email = await User.findOne({ email: req.body.data.email });

  if (email) {
    res.json({ type: 2, text: 1 });
    return;
  }

  const username = await User.findOne({ username: req.body.data.username });

  if (username) {
    res.json({ type: 2, text: 2 });
    return;
  }

  const user = new User({
    ...req.body.data,
    password: hmac(req.body.data.password, config.dbkey)
  });

  try {
    await user.save();
  } catch (e) {
    res.json({ type: 2, text: 3 });
    return;
  }

  let newsletter = await Newsletter.findOne({
    email: req.body.data.email
  });

  if (newsletter) {
    res.json({ type: 0 });
    return;
  }


  newsletter = new Newsletter({
    email: req.body.data.email
  });

  try {
    await newsletter.save();
    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 3 });
  }
});

export default router;
