import { Router } from 'express';

import User from 'Root/models/User';

import removeImage from 'Root/utils/removeImage';
import { logged } from 'Root/perms';

const router = new Router();

router.post('/panel/user/setting/avatar/remove', logged, async (req, res) => {
  const user = await User.findById(req.session.user);

  if (!user) {
    res.json({ type: 2 });
    return;
  }

  try {
    await removeImage(user.avatar);

    user.avatar = null;

    await user.save();

    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
