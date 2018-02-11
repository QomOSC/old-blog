import { Router } from 'express';

const { Member } = rootRequire('./models');
const { logged } = rootRequire('./perms');
const { crypt } = rootRequire('./utils');

const router = new Router();

router.post('/u/setting/password', logged, (req, res) => {

  Member.findOne({ _id: req.member.user._id }).then(member => {

    if (req.body.password === crypt.decrypt(member.password, member.email)) {
      member.password =
        crypt.encrypt(req.body.newpassword, member.email);

      member.save().then(() => {
        // All Good
        res.json({ type: 0 });
      }).catch(() => {
        // Error
        res.json({ type: 2, text: 0 });
      });
    } else {
      // Wrong Old Password
      res.json({ type: 2, text: 1 });
    }
  }).catch(() => {
    // Error
    res.json({ type: 2, text: 0 });
  });
});

export default router;
