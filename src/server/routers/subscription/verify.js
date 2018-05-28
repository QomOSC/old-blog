import { Router } from 'express';

import Newsletter from 'Root/models/Newsletter';

import requirements from 'Root/middlewares/requirements';

const router = new Router();


router.post(
  '/subscribe/verify',
  requirements(['token']),
  async (req, res) => {

  const member = await Newsletter.findOne({
    token: req.body.token,
    verified: false
  });

  if (!member) {
    return res.json({ type: 2, text: 0 });
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
