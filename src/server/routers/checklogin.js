import { Router } from 'express';

import User from 'Root/models/User';

import logged from 'Root/middlewares/permissions/logged';

const router = new Router();


router.post('/checklogin', logged, async (req, res) => {
  const user = await User
    .findById(req.session.user)
    .select('_id name type email avatar username description');

  res.json({ type: 0, user });
});

export default router;
