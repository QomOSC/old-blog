import { Router } from 'express';

const perm = rootRequire('./perms');
const { Member } = rootRequire('./models');

const router = new Router();

router.get('/u/sub/manage', perm.logged, perm.u.admin, (req, res) => {
  Member.findOne({ _id: req.member.user._id }).then(member => {

    if (member && JSON.stringify(member.submembers) !== '[]') {

      const subs = [];

      function* getResponse() {
        for (const i of member.submembers) {
          yield new Promise(resolve => {
            Member.findOne({ _id: i }).then(sub => {
              subs.push(sub);
              resolve();

            }).catch(() => {
              res.reply.error();
            });
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
      res.render('u/new/manage.njk', {
        member: req.member.user,
        empty: true
      });
    }

  }).catch(() => {
    res.reply.error();
  });
});

export default router;
