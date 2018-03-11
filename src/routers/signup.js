import { Router } from 'express';

const { Member, Newsletter } = rootRequire('./models');
const { login } = rootRequire('./perms');
const { validator, email, crypt } = rootRequire('./utils');

const router = new Router();

router.get('/signup', login, (req, res) => {
  res.render('signup.njk');
});

router.post('/signup', login, async(req, res) => {
  if (!req.body.fname ||
      !req.body.lname ||
      !req.body.email ||
      !req.body.username ||
      !req.body.password ||
      !req.body.captcha) {

    // Undefined Values
    res.json({ type: 2, text: 1 });
    return;
  }

  if (req.body.captcha.toLowerCase() !== req.session.captcha) {
    // Wrong Captcha
    res.json({ type: 2, text: 5 });
    return;
  }

  req.body.email = req.body.email.toLowerCase();
  req.body.username = req.body.username.toLowerCase();

  if (!validator.e(req.body.email) || !validator.u(req.body.username)) {
    // Validate Error
    res.json({ type: 2, text: 6 });
    return;
  }

  const member = new Member({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    username: req.body.username,
    password: crypt.encrypt(req.body.password, req.body.email),
    type: 1
  });

  try {
    await member.save();
    email.signup(req.body.email);

    const nl = await Newsletter.findOne({ email: req.body.email });

    if (nl) {
      // Done, Member was already in newsletter
      req.session.captcha = null;
      res.json({ type: 0 });
      return;
    }

    const addToNewsletter = new Newsletter({
      email: req.body.email
    });

    await addToNewsletter.save();

    // Done
    req.session.captcha = null;
    res.json({ type: 0 });
  } catch (e) {
    const err = e.errmsg.split(' ');

    if (err.includes('duplicate')) {
      if (err.includes('username_1')) {
        // Username Taken
        res.json({ type: 2, text: 3 });
      } else if (err.includes('email_1')) {
        // Username Taken
        res.json({ type: 2, text: 4 });
      }
    } else {
      // Error
      res.json({ type: 2, text: 2 });
    }
  }
});

export default router;
