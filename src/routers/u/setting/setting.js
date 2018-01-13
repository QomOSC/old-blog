import { Router } from 'express';

const { logged } = rootRequire('./perms');
const { Member } = rootRequire('./models');

const router = new Router();

router.get('/u/setting', logged, (req, res) => {
  res.render('u/setting.njk', { member: req.member.user });
});

router.post('/u/setting', logged, (req, res) => {
  Member.findOne({ _id: req.member.user._id }).then(member => {
    member.fname = req.body.fname;
    member.lname = req.body.lname;
    member.email = req.body.email.toLowerCase();
    member.description = req.body.description;

    member.save().then(() => {
      res.send('done');
    }).catch(() => {
      res.send('err');
    });
  }).catch(() => {
    res.send('err');
  });
});

export default router;
