import { Router } from 'express';

import User from 'Root/models/User';

const router = new Router();

router.post('/user/:username', async (req, res) => {
  req.params.username = req.params.username.toLowerCase();

  const user = await User
    .findOne({ username: req.params.username })
    .select('_id name type email avatar username description');

  if (!user) {
    res.json({ type: 2, text: 0 });
    return;
  }

  res.json({ type: 0, user });
});

export default router;
