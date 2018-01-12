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
    res.json({ body: req.body, sent: true });
  }).catch(e => {
    console.log(e);
    res.json({ body: req.body, sent: false });
  });
});

export default router;
