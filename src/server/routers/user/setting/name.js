import { Router } from 'express';

import User from 'Root/models/User';

import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';

const router = new Router();


router.post(
  '/panel/user/setting/name',
  logged,
  requirements(['name']),
  async (req, res) => {

  try {
    const user = await User.findById(req.session.user);

    user.name = req.body.name;

    await user.save();

    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 1 });
  }
});

export default router;
