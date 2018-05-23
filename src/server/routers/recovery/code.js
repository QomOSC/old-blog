import { Router } from 'express';

import Recovery from 'Root/models/Recovery';
import User from 'Root/models/User';

import requirements from 'Root/middlewares/requirements';
import login from 'Root/middlewares/permissions/login';
import { hmac } from 'Root/utils/crypto';
import config from 'Root/config';

const router = new Router();


router.post(
  '/recovery/:code',
  login,
  requirements(['password']),
  async (req, res) => {

  if (!req.params.code) {
    res.json({ type: 4 });

    return;
  }

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


  try {
    user.password = hmac(req.body.password, config.dbkey);

    await user.save();

    await rec.remove();

    res.json({ type: 0 });
  }

  catch (e) {
    res.json({ type: 2, text: 2 });
  }
});

export default router;
