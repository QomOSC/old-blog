import { Router } from 'express';

const perm = rootRequire('./perms');
const { Member } = rootRequire('./models');

const router = new Router();

router.get('/u/sub', perm.logged, perm.u.admin, (req, res) => {
  Member.find({ type: 1 }).then(member => {
    if (JSON.stringify(member) !== '[]') {
      res.render('u/sub/all.njk', {
        member
      });
    } else {
      res.render('u/sub/all.njk', {
        empty: true
      });
    }
  }).catch(() => {
    res.json({ type: 2, text: 0 });
  });
});

export default router;
