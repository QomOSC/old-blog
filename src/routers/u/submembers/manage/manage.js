import { Router } from 'express';

const { Member } = rootRequire('./models');
const perm = rootRequire('./perms');

const router = new Router();

router.get('/u/sub/manage', perm.logged, perm.u.admin, async(req, res) => {

  const member = await Member.findOne({ _id: req.member.user._id });

  if (member && member.submembers.length !== 0) {

    const subs = [];

    function* getResponse() {
      for (const i of member.submembers) {
        yield new Promise(async resolve => {

          const sub = await Member.findOne({ _id: i });
          
          subs.push(sub);
          resolve();
        });
      }
    }

    const iterator = getResponse();
    (function loop() {

      const next = iterator.next();
      if (next.done) {
        res.render('u/sub/manage.njk', {
          member: req.member.user,
          subs
        });

        return;
      }

      next.value.then(loop);
    })();

  } else {
    res.render('u/sub/manage.njk', {
      member: req.member.user,
      empty: true
    });
  }
});

export default router;
