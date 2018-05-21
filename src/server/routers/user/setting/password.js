import { Router } from 'express';

import User from 'Root/models/User';

import { password } from 'Root/utils/validator';
import { hmac } from 'Root/utils/crypto';
import { logged } from 'Root/perms';
import config from 'Root/config';

const router = new Router();


router.post('/panel/user/setting/password', logged, async (req, res) => {
  if (!req.body.fresh || !req.body.old || !req.session.user) {
    res.json({ type: 4 });

    return;
  }
  
  const user = await User.findById(req.session.user);

  if (!password(req.body.fresh)) {
    res.json({ type: 2, text: 1 });

    return;
  }

  if (hmac(req.body.old, config.dbkey) !== user.password) {
    res.json({ type: 2, text: 2 });

    return;
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
