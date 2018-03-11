import { Router } from 'express';

const { Newsletter } = rootRequire('./models');
const { email } = rootRequire('./utils');

const router = new Router();

router.get('/unsubscribe', (req, res) => {
  res.render('newsletter/unsubscribe.njk');
});

router.post('/unsubscribe', async(req, res) => {
  req.body.email = req.body.email.toLowerCase();

  if (req.body.captcha.toLowerCase() !== req.session.captcha) {
    // Wrong Captcha
    res.json({ type: 2, text: 0 });
    return;
  }

  const member = await Newsletter.findOne({ email: req.body.email });

  if (!member) {
    // User not found in Newsletter
    res.json({ type: 2, text: 1 });
    return;
  }

  try {
    await email.unsubscribe(req.body.email, member._id);
    req.session.captcha = null;
    res.json({ type: 0 });
  } catch (e) {
    // Error in Sending Email
    res.json({ type: 2, text: 2 });
  }
});

router.get('/unsubscribe/:token', async(req, res) => {
  const member = await Newsletter.findOne({ _id: req.params.token });

  if (!member) {
    res.reply.notFound();
    return;
  }

  try {
    await member.remove();
    res.render('newsletter/unsubscribe.njk', { done: true });
  } catch (e) {
    res.reply.notFound();
  }
});

export default router;
