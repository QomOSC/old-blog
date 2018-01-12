import { Router } from 'express';

const { logged } = rootRequire('./perms');
const { Member } = rootRequire('./models');

const router = new Router();

router.post('/u/setting/password', logged, (req, res) => {

  Member.findOne({ _id: req.member.user._id }).then(member => {
    if (req.body.password === member.password) {
      member.password = req.body.newpassword;

      member.save().then(() => {
        res.send('done');
      }).catch(() => {
        res.send('err');
      });
    } else {
      res.send('err');      
    }
  }).catch(() => {
    res.send('err');
  });
});

export default router;
