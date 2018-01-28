import { Router } from 'express';

const perm = rootRequire('./perms');
const { Member } = rootRequire('./models');

const router = new Router();

router.get('/u/sub', perm.logged, perm.u.admin, (req, res) => {
  Member.find({ type: 1 }).then(members => {
    if (JSON.stringify(members) !== '[]') {
      res.render('u/sub/all.njk', {
        member: req.member.user,
        members
      });
    } else {
      res.render('u/sub/all.njk', {
        empty: true,
        member: req.member.user
      });
    }
  }).catch(() => {
    res.json({ type: 2, text: 0 });
  });
});

export default router;
