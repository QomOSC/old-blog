import { Router } from 'express';

const { Member } = rootRequire('./models');
const perm = rootRequire('./perms');

const router = new Router();

router.get('/u/sub/manage', perm.logged, perm.u.admin, async(req, res) => {

  const member = await Member.findOne({ _id: req.member.user._id });

  if (!member || !member.submembers.length) {
    res.render('u/sub/manage.njk', {
      empty: true
    });
    return;
  }

  const subs = [];

  for (const i of member.submembers) {
    const sub = await Member.findOne({ _id: i });
    subs.push(sub);
  }

  res.render('u/sub/manage.njk', { subs });
});

export default router;
