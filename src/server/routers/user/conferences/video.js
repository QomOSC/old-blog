import { Router } from 'express';

import Conference from 'Root/models/Conference';

import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';
import admin from 'Root/middlewares/permissions/admin';

const router = new Router();


router.post(
  '/panel/conferences/video',
  logged,
  admin,
  requirements(['_id', 'embed']),
  async (req, res) => {

  try {
    const conf = await Conference.findById(req.body._id);

    if (!conf) {
      return res.json({ type: 2, text: 0 });
    }

    conf.embeds.push(req.body.embed);

    await conf.save();

    res.json({ type: 0 });
  }

  catch (e) {
    res.json({ type: 2, text: 1 });
  }
});

export default router;
