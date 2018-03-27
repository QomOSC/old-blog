import { Router } from 'express';

import User from 'Root/models/User';

const router = new Router();


router.post('/checklogin', async (req, res) => {
  if (!req.session.user) {
    res.json({ type: 2 });
    return;
  }

  const user = await User.findById(req.session.user);

  res.json({ type: 0, user });
});

export default router;
