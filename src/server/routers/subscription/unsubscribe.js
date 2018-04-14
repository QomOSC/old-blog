import { Router } from 'express';

import Newsletter from 'Root/models/Newsletter';

const router = new Router();

router.post('/unsubscribe', async (req, res) => {
  req.body.email = req.body.email.toLowerCase();

  let newsletter = await Newsletter.findOne({ email: req.body.email });

  if (!newsletter) {
    res.json({ type: 2, text: 0 });
    return;
  }

  try {
    // send newsletter._id to his email
    res.json({ type: 0 });
  }
  catch (e) {
    res.json({ type: 2, text: 1 });
  }
});

export default router;
