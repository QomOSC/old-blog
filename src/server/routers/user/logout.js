import { Router } from 'express';

import logged from 'Root/middlewares/permissions/logged';

const router = new Router();


router.post('/panel/logout', logged, (req, res) => {
  req.session.user = null;

  res.json({ type: 0 });
});

export default router;
