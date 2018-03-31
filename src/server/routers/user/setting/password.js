import { Router } from 'express';

import User from 'Root/models/User';

import { hmac } from 'Root/utils/crypto';
import { password } from 'Root/utils/validator';

import config from 'Root/config';
import { logged } from 'Root/perms';

const router = new Router();

router.post('/panel/user/setting/password', logged, async (req, res) => {
  const user = await User.findById(req.session.user);

  if (!user) {
    res.json({ type: 2, text: 0 });
    return;
  }

  if (!password(req.body.fresh)) {
    res.json({ type: 2, text: 1 });
    return;
  }

  if (hmac(req.body.old, config.dbkey) !== user.password) {
    res.json({ type: 2, text: 2 });
    return;
  }

  user.password = hmac(req.body.fresh, config.dbkey);

  try {
    await user.save();

    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 3 });
  }
});

export default router;
