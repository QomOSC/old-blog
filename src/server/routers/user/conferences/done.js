import { Router } from 'express';

import Conference from 'Root/models/Conference';

import { admin } from 'Root/perms';

const router = new Router();


router.post('/panel/conferences/done', admin, async (req, res) => {
  if (!req.body._id) {
    res.json({ type: 4 });

    return;
  }
  
  try {
    const conf = await Conference.findById(req.body._id);

    if (!conf) {
      res.json({ type: 2 });

      return;
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
