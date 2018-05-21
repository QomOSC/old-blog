import { Router } from 'express';

import Conference from 'Root/models/Conference';

import { logged } from 'Root/perms';

const router = new Router();


router.post('/panel/conferences/add', logged, async (req, res) => {
  if (
    !req.body.description ||
    !req.body.providers ||
    !req.session.user ||
    !req.body.title ||
    !req.body.start ||
    !req.body.end
  ) {
    res.json({ type: 4 });

    return;
  }
  
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
