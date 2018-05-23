import { Router } from 'express';

import Conference from 'Root/models/Conference';

import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';

const router = new Router();


router.post(
  '/panel/conferences/add',
  logged,
  requirements(['description', 'providers', 'title', 'start', 'end']),
  async (req, res) => {

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
