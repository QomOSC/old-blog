import { Router } from 'express';

import ActivationLink from 'Root/models/ActivationLink';
import User from 'Root/models/User';

import { login } from 'Root/perms';

const router = new Router();


router.post('/activate', login, async (req, res) => {
  const AL = await ActivationLink.findOne({ code: req.body.code });

  if (!AL) {
    res.json({ type: 2 });
    return;
  }

  try {
    const user = await User.findById(AL.user);

    if (!user) {
      res.json({ type: 2 });
      return;
    }

    user.verified = true;

    await user.save();
    await AL.remove();

    res.json({ type: 0 });
  }
  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
