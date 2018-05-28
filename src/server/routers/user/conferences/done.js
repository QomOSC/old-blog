import { Router } from 'express';

import Conference from 'Root/models/Conference';

import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';
import admin from 'Root/middlewares/permissions/admin';

const router = new Router();


router.post(
  '/panel/conferences/done',
  logged,
  admin,
  requirements(['_id']),
  async (req, res) => {

  try {
    const conf = await Conference.findById(req.body._id);

    if (!conf) {
      return res.json({ type: 2 });
    }

    conf.done = true;

    await conf.save();

    res.json({ type: 0 });
  }

  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
