import { Router } from 'express';

import ActivationLink from 'Root/models/ActivationLink';
import User from 'Root/models/User';

import requirements from 'Root/middlewares/requirements';
import login from 'Root/middlewares/permissions/login';

const router = new Router();


router.post('/activate', login, requirements(['code']), async (req, res) => {

  const AL = await ActivationLink.findOne({ code: req.body.code });

  if (!AL) {
    return res.json({ type: 2 });
  }

  try {
    const user = await User.findById(AL.user);

    if (!user) {
      return res.json({ type: 2 });
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
