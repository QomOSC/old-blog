import { Router } from 'express';

import User from 'Root/models/User';

const router = new Router();

router.post('/user/:username', async (req, res) => {
  req.params.username = req.params.username.toLowerCase();

  const user = await User
    .findOne({ username: req.params.username })
    .select('-submembers -password -__v')
    .lean();

  if (!user) {
    res.json({ type: 2 });
    return;
  }

  res.json({
    type: 0,
    user: {
      ...user,
      articles: user.articles.length
    }
  });
});

export default router;
