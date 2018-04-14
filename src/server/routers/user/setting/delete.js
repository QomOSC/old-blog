import { Router } from 'express';

import Newsletter from 'Root/models/Newsletter';
import User from 'Root/models/User';

import removeArticles from 'Root/utils/remove/removeArticles';
import removeImage from 'Root/utils/removeImage';

import { logged } from 'Root/perms';

const router = new Router();

router.post('/panel/user/setting/delete', logged, async (req, res) => {
  try {
    const user = await User.findById(req.session.user);
    const newsletter = await Newsletter.findOne({ email: user.email });

    await removeImage(user.avatar);
    await removeArticles(req.session.user);

    await newsletter.remove();
    await user.remove();

    res.json({ type: 0 });
  }
  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
