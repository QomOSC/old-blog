import { Router } from 'express';

const { Newsletter } = rootRequire('./models');
const { validator } = rootRequire('./utils');

const router = new Router();

router.post('/subscribe', async(req, res) => {
  req.body.email = req.body.email.toLowerCase();

  if (!validator.e(req.body.email)) {
    // Wrong Email
    res.json({ type: 2, text: 1 });
    return;
  }

  const member = await Newsletter.findOne({ email: req.body.email });

  if (member) {
    // It was in it already
    res.json({ type: 0, text: 0 });
    return;
  }

  const newMember = new Newsletter({
    email: req.body.email
  });

  try {
    await newMember.save();
    // New email added successfully
    res.json({ type: 0, text: 1 });
  } catch (e) {
    res.json({ type: 2, text: 0 });
  }
});

export default router;
