import { Router } from 'express';

import Conference from 'Root/models/Conference';

import { logged } from 'Root/perms';

const router = new Router();

router.post('/conference/attend', logged, async (req, res) => {
  try {
    const conf = await Conference.findById(req.body._id);

    if (!conf) {
      res.json({ type: 2, text: 0 });
      return;
    }

    if (conf.attenders.includes(req.session.user)) {
      res.json({ type: 0, text: 0 });
      return;
    }

    conf.attenders.push(req.session.user);

    await conf.save();

    res.json({ type: 0, text: 1 });
  }

  catch (e) {
    res.json({ type: 2, text: 1 });
  }
});

export default router;
