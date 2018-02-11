import { Router } from 'express';

const { Conference, Member } = rootRequire('./models');
const perms = rootRequire('./perms');
const { moment } = rootRequire('./utils');

const router = new Router();
router.get(
  '/u/conference/manage/',
  perms.logged,
  perms.u.admin,
  (req, res) => {
    Conference.find({ type: 1 }).then(confs => {
      if (confs.length !== 0) {

        const allConfs = [];
        function* getResponse() {

          for (const i of confs) {
            yield new Promise(resolve => {
              let description = i.description.split('').slice(0, 130);
              description.push('.', '.', '.');
              description = description.join('');

              const oneConf = {
                _id: i._id,
                title: i.title,
                createdAt: moment(i.createdAt),
                author: {},
                description
              };

              Member.findOne({ _id: i.provider }).then(member => {
                if (member) {
                  oneConf.author.fname = member.fname;
                  oneConf.author.lname = member.lname;
                  oneConf.author.username = member.username;
                  oneConf.author.avatar = member.avatar;

                  allConfs.push(oneConf);
                  resolve();
                } else {
                  res.reply.error();
                }
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
            res.render('u/conference/manage/manage.njk', {
              member: req.member.user,
              confs: allConfs
            });
            return;
          }

          next.value.then(loop);
        })();
      } else {
        res.render('u/conference/manage/manage.njk', {
          member: req.member.user,
          empty: true
        });
      }
    }).catch(() => {
      res.reply.error();
    });
});

export default router;
