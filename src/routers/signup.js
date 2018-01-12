import { Router } from 'express';
import { Member } from '../models';

const router = new Router();

router.get('/signup', (req, res) => {
  res.render('signup.njk');
});

router.post('/signup', (req, res) => {
  const member = new Member({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  });

  member.save().then(() => {
    req.member.login(member);
    res.redirect('/u');
  }).catch(() => {
    res.json({ body: req.body, done: false });
  });
});

export default router;
