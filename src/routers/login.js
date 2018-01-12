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


  Member.findOne({
    email: req.body.email
  }).then(member => {
    if (member) {
      const encryptedPass = crypt.decrypt(member.password, member.email);

      if (encryptedPass === req.body.password) {
        req.member.login(member);
        res.redirect('/u');
      } else {
        res.json({ body: req.body, done: false });
      }
    } else {
      res.json({ body: req.body, done: false });
    }
  }).catch(() => {
    res.json({ body: req.body, done: false });
  });
});

export default router;
