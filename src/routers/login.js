import { Router } from 'express';

const { login } = rootRequire('./perms');
const { Member } = rootRequire('./models');

const router = new Router();

router.get('/login', login, (req, res) => {
  res.render('login.njk');
});

router.post('/login', login, (req, res) => {
  req.body.email = req.body.email.toLowerCase();

  Member.findOne({
    email: req.body.email,
    password: req.body.password
  }).then(member => {
    req.member.login(member);
    res.send('You are in');
  }).catch(() => {
    res.send('Damn it');
  });
});

export default router;
