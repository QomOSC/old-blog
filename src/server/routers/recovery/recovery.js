import { Router } from 'express';

import Recovery from 'Root/models/Recovery';
import User from 'Root/models/User';

import random from 'Root/utils/random';

import { login } from 'Root/perms';

const router = new Router();

router.post('/recovery', login, async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.json({ type: 2, text: 0 });
    return;
  }

  let rec = await Recovery.findOne({ user: user._id });

  if (rec) {
    // send
    res.json({ type: 0 });
    return;
  }

  const code = await random(25);

  rec = new Recovery({
    user: user._id,
    code
  });

  try {
    await rec.save();
    // send
    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 1 });
  }
});

export default router;
