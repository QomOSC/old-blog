import { Router } from 'express';

const { logged } = rootRequire('./perms');
const { Member } = rootRequire('./models');

const router = new Router();

router.post('/u/setting/delete', logged, (req, res) => {
  Member.remove({ _id: req.member.user._id }).then(() => {
    req.member.logout();

    res.redirect('/');
  }).catch(() => {
    res.send('err');
  });
});

export default router;
