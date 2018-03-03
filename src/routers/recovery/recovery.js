import { Router } from 'express';

const { Member, Recovery } = rootRequire('./models');
const { login } = rootRequire('./perms');
const { email, random } = rootRequire('./utils');

const router = new Router();

router.get('/recovery', login, (req, res) => {
  res.render('recovery/recovery.njk');
});

router.post('/recovery', login, async(req, res) => {
  if (!req.body.email || !req.body.captcha) {
    // Values are not complete
    res.json({ type: 2, text: 0 });
    return;
  }

  req.body.email = req.body.email.toLowerCase();

  if (req.body.captcha !== req.session.captcha) {
    // Wrong Captcha
    res.json({ type: 2, text: 1 });
    return;
  }

  req.session.captcha = null;

  const r = await random();
  const member = await Member.findOne({ email: req.body.email });

  if (!member) {
    // Email not found
    res.json({ type: 2, text: 3 });
    return;
  }

  const rec = new Recovery({
    token: r,
    member: member._id
  });

  rec.save().then(() => {

    res.json({ type: 0 });
    email.recovery(req.body.email, rec.token).catch();

  }).catch(() => {
    // Error
    res.json({ type: 2, text: 2 });
  });
});

router.get('/recovery/:token', login, async(req, res) => {

  const member = await Recovery.findOne({ token: req.params.token });

  if (!member) {
    res.reply.notFound();
    return;
  }
  
  res.render('recovery/change.njk', {
    token: req.params.token
  });
});

export default router;
