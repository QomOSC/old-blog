import { Router } from 'express';

import Conference from 'Root/models/Conference';

import { logged } from 'Root/perms';

const router = new Router();

router.post('/panel/conferences/add', logged, async (req, res) => {
  const conf = new Conference({
    description: req.body.description,
    providers: req.body.providers,
    author: req.session.user,
    title: req.body.title,
    start: req.body.start,
    end: req.body.end
  });

  try {
    await conf.save();

    res.json({ type: 0 });
  }
  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
