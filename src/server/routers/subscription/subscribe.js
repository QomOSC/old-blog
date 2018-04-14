import { Router } from 'express';

import Newsletter from 'Root/models/Newsletter';

const router = new Router();

router.post('/subscribe', async (req, res) => {
  req.body.email = req.body.email.toLowerCase();

  let newsletter = await Newsletter.findOne({ email: req.body.email });

  if (newsletter) {
    res.json({ type: 0, text: 0 });
    return;
  }

  newsletter = new Newsletter({
    email: req.body.email
  });

  try {
    await newsletter.save();

    res.json({ type: 0, text: 1 });
  }
  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
