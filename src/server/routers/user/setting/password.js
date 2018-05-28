import { Router } from 'express';

import User from 'Root/models/User';

import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';
import { password } from 'Root/utils/validator';
import { hmac } from 'Root/utils/crypto';
import config from 'Root/config';

const router = new Router();


router.post(
  '/panel/user/setting/password',
  logged,
  requirements(['fresh', 'old']),
  async (req, res) => {

  const user = await User.findById(req.session.user);

  if (!password(req.body.fresh)) {
    return res.json({ type: 2, text: 1 });
  }

  if (hmac(req.body.old, config.dbkey) !== user.password) {
    return res.json({ type: 2, text: 2 });
  }


  try {
    user.password = hmac(req.body.fresh, config.dbkey);

    await user.save();

    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 3 });
  }
});

export default router;
