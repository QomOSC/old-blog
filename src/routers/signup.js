import { Router } from 'express';

const { login } = rootRequire('./perms');
const { Member } = rootRequire('./models');
const { crypt } = rootRequire('./utils');

const router = new Router();

router.get('/signup', login, (req, res) => {
  res.render('signup.njk');
});

router.post('/signup', login, (req, res) => {
  if (req.body.fname &&
      req.body.lname &&
      req.body.email &&
      req.body.username &&
      req.body.password) {

    req.body.email = req.body.email.toLowerCase();
    req.body.username = req.body.username.toLowerCase();

    const member = new Member({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      username: req.body.username,
      password: crypt.encrypt(req.body.password, req.body.email),
      type: 2
    });

    member.save().then(() => {
      // OK
      res.json({ type: 0 });
    }).catch(() => {
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
    });
  } else {
    // Undefined Values
    res.json({ type: 2, text: 1 });
  }
});

export default router;
