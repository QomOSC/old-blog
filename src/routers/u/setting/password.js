import { Router } from 'express';

const { logged } = rootRequire('./perms');
const { Member } = rootRequire('./models');
const { crypt } = rootRequire('./utils');

const router = new Router();

router.post('/u/setting/password', logged, (req, res) => {

  Member.findOne({ _id: req.member.user._id }).then(member => {
    const encryptedPass = crypt.decrypt(member.password, member.email);

    if (req.body.password === encryptedPass) {
      member.password =
        crypt.encrypt(req.body.newpassword, member.email);

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
