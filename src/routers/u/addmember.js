import { Router } from 'express';

const perms = rootRequire('./perms');
const { Member } = rootRequire('./models');

const router = new Router();

router.get('/u/addmember', perms.logged, perms.u.admin, (req, res) => {
  res.render('u/addmember.njk');
});

router.post('/u/addmember', perms.logged, perms.u.admin, (req, res) => {
  req.body.email = req.body.email.toLowerCase();

  const member = new Member({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  member.save().then(() => {

    Member.findOne({
      _id: req.member.user._id
    }).then(doc => {
      doc.submembers.push(member._id);

      doc.save().then(() => {
        res.send('done');
      }).catch(() => {
        res.send('err1');
      });
    }).catch(() => {
      res.send('err2');
    });
  }).catch(() => {
    res.send('err3');
  });
});

export default router;
