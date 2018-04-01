import { Router } from 'express';

import User from 'Root/models/User';

import { hmac } from 'Root/utils/crypto';
import config from 'Root/config';
import { login } from 'Root/perms';

const router = new Router();


router.post('/login', login, async (req, res) => {
  req.body.email = req.body.email.toLowerCase();

  const user = await User
    .findOne({ email: req.body.email,
      password: hmac(req.body.password, config.dbkey)
    })
    .select('_id name type email avatar username description');

  if (!user) {
    res.json({ type: 2, text: 0 });
    return;
  }

  if (user.type === 1) {
    // Account is deactive
    res.json({ type: 2, text: 1 });
    return;
  }

  req.session.user = user._id.toString();

  res.json({ type: 0, user });
});

export default router;
