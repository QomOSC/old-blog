import { Router } from 'express';

const { Member } = rootRequire('./models');
const { login } = rootRequire('./perms');
const { crypt } = rootRequire('./utils');

const router = new Router();

router.get('/login', login, (req, res) => {
  res.render('login.njk');
});

router.post('/login', login, async(req, res) => {
  req.body.email = req.body.email.toLowerCase();
  req.body.captcha = req.body.captcha.toLowerCase();

  if (req.body.captcha !== req.session.captcha) {
    // Wrong Captcha
    res.json({ type: 2, text: 3 });
    return;
  }

  const member = await Member.findOne({ email: req.body.email });

  if (!member) {
    // User Not Found
    res.json({ type: 2, text: 1 });
    return;
  }

  if (crypt.decrypt(member.password, member.email) !==
  req.body.password) {
    // Wrong Password
    res.json({ type: 2, text: 0 });
    return;
  }

  if (member.type === 1) {
    // Account is deactive
    res.json({ type: 1, text: 0 });
    return;
  }

  req.member.login(member);
  // OK
  req.session.captcha = null;
  res.json({ type: 0 });
});

export default router;
