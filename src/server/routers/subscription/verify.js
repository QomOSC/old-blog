import { Router } from 'express';

import Newsletter from 'Root/models/Newsletter';

const router = new Router();


router.post('/subscribe/verify', async (req, res) => {
  if (!req.body.token) {
    res.json({ type: 4 });

    return;
  }
  
  const member = await Newsletter.findOne({
    token: req.body.token,
    verified: false
  });

  if (!member) {
    res.json({ type: 2, text: 0 });

    return;
  }


  try {
    member.verified = true;

    await member.save();

    res.json({ type: 0 });
  }

  catch (e) {
    res.json({ type: 2, text: 1 });
  }
});

export default router;
