import { Router } from 'express';

const { Member } = rootRequire('./models');
const perm = rootRequire('./perms');

const router = new Router();

router.get('/u/sub', perm.logged, perm.u.admin, async(req, res) => {

  const members = await Member.find({ type: 1 });

  if (members.length !== 0) {
    res.render('u/sub/all.njk', {
      members
    });
  } else {
    res.render('u/sub/all.njk', {
      empty: true
    });
  }
});

export default router;
