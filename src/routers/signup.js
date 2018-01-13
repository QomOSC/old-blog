import { Router } from 'express';

const { Member } = rootRequire('./models');
const { crypt } = rootRequire('./utils');

const router = new Router();

router.get('/signup', (req, res) => {
  res.render('signup.njk');
});

router.post('/signup', (req, res) => {
  req.body.email = req.body.email.toLowerCase();

  const member = new Member({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    username: req.body.username,
    password: crypt.encrypt(req.body.password, req.body.email)
  });

  member.save().then(() => {
    req.member.login(member);
    res.redirect('/u');
  }).catch(() => {
    res.json({ body: req.body, done: false });
  });
});

export default router;
