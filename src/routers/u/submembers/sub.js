import { Router } from 'express';

const { Member } = rootRequire('./models');
const perm = rootRequire('./perms');

const router = new Router();

router.get('/u/sub', perm.logged, perm.u.admin, async(req, res) => {

  const members = await Member.find({ type: 1 });

  if (members.length) {
    res.render('u/sub/all.njk', {
      members
    });
    return;
  }

  res.render('u/sub/all.njk', {
    empty: true
  });
});

export default router;
