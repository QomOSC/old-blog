import { Router } from 'express';

import Recovery from 'Root/models/Recovery';
import User from 'Root/models/User';

import { hmac } from 'Root/utils/crypto';
import { login } from 'Root/perms';
import config from 'Root/config';

const router = new Router();

router.post('/recovery/:code', login, async (req, res) => {
  const rec = await Recovery.findOne({ code: req.params.code });

  if (!rec) {
    res.json({ type: 2, text: 0 });
    return;
  }

  if (!req.body.password) {
    res.json({ type: 2, text: 1 });
    return;
  }

  const user = await User.findById(rec.user);

  user.password = hmac(req.body.password, config.dbkey);

  try {
    await user.save();

    await rec.remove();

    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 2 });
  }
});

export default router;
