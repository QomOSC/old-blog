import { Router } from 'express';

import Recovery from 'Root/models/Recovery';

import requirements from 'Root/middlewares/requirements';
import login from 'Root/middlewares/permissions/login';

const router = new Router();


router.post(
  '/recovery/check',
  login,
  requirements(['code']),
  async (req, res) => {

  const rec = await Recovery.findOne({ code: req.body.code });

  if (rec) {
    return res.json({ type: 0 });
  }

  res.json({ type: 2 });
});

export default router;
