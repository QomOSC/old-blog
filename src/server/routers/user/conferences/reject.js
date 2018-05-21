import { Router } from 'express';

import Conference from 'Root/models/Conference';

import { admin } from 'Root/perms';

const router = new Router();


router.post('/panel/conferences/reject', admin, async (req, res) => {
  if (!req.body._id) {
    res.json({ type: 4 });

    return;
  }
  
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
