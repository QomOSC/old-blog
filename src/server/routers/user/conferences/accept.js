import { Router } from 'express';

import Conference from 'Root/models/Conference';

import { admin } from 'Root/perms';

const router = new Router();

router.post('/panel/conferences/accept', admin, async (req, res) => {
  try {
    const conf = await Conference.findOne({ _id: req.body._id, type: 1 });

    conf.type = 2;
    conf.end = req.body.end;
    conf.start = req.body.start;
    conf.title = req.body.title;
    conf.description = req.body.description;

    await conf.save();

    res.json({ type: 0 });
  }
  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
