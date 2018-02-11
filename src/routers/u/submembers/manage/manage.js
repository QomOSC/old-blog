import { Router } from 'express';

const { Member } = rootRequire('./models');
const perm = rootRequire('./perms');

const router = new Router();

router.get('/u/sub/manage', perm.logged, perm.u.admin, (req, res) => {
  Member.findOne({ _id: req.member.user._id }).then(member => {

    if (member && member.submembers.length !== 0) {

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
      res.render('u/sub/manage.njk', {
        member: req.member.user,
        empty: true
      });
    }

  }).catch(() => {
    res.reply.error();
  });
});

export default router;
