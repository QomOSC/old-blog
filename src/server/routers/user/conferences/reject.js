import { Router } from 'express';

import Conference from 'Root/models/Conference';

import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';
import admin from 'Root/middlewares/permissions/admin';

const router = new Router();


router.post(
  '/panel/conferences/reject',
  logged,
  admin,
  requirements(['_id']),
  async (req, res) => {

  try {
    const conf = await Conference.findOne({ _id: req.body._id, type: 1 });

    await conf.remove();

    res.json({ type: 0 });
  }

  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
