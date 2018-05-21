import { Router } from 'express';

import User from 'Root/models/User';

import logged from 'Root/middlewares/permissions/logged';
import removeImage from 'Root/utils/removeImage';

const router = new Router();


router.post('/panel/user/setting/avatar/remove', logged, async (req, res) => {
  try {
    const user = await User.findById(req.session.user);

    await removeImage(user.avatar);

    user.avatar = null;

    await user.save();

    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
