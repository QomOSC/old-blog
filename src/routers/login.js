import { Router } from 'express';

const { login } = rootRequire('./perms');
const { Member } = rootRequire('./models');
const { crypt } = rootRequire('./utils');

const router = new Router();

router.get('/login', login, (req, res) => {
  res.render('login.njk');
});

router.post('/login', login, (req, res) => {
  req.body.email = req.body.email.toLowerCase();

  if (req.body.captcha === req.session.captcha) {
    Member.findOne({
      email: req.body.email
    }).then(member => {
      if (member) {

        if (crypt.decrypt(member.password, member.email)
          === req.body.password) {
          req.member.login(member);

          // OK
          req.session.captcha = null;
          res.json({ type: 0 });
        } else {
          // Wrong Password
          res.json({ type: 2, text: 0 });
        }
      } else {
        // User Not Found
        res.json({ type: 2, text: 1 });
      }
    }).catch(() => {
      // Error
      res.json({ type: 2, text: 2 });
    });
  } else {
    // Wrong Captcha
    res.json({ type: 2, text: 3 });
  }
});

export default router;
