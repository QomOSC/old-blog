import { Router } from 'express';

const { Conference, Member } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/conferences', (req, res) => {
  Conference
    .find({ type: { $in: [3, 4] } })
    .sort({ createdAt: -1 })
    .limit(20)
    .then(confs => {
      if (JSON.stringify(confs) === '[]') {
        res.render('conferences.njk', {
          empty: true
        });
      } else {

        const confArr = [];

        function* getResponse() {
          for (const i of confs) {
            yield new Promise(resolve => {

              const oneConf = {
                title: i.title,
                createdAt: moment(i.createdAt),
                description: i.description,
                avatar: i.avatar,
                provider: {},
              };

              Member.findOne({ _id: i.provider }).then(member => {
                if (member) {
                  oneConf.provider.fname = member.fname;
                  oneConf.provider.lname = member.lname;
                  oneConf.provider.username = member.username;
                  oneConf.provider.avatar = member.avatar;

                  confArr.push(oneConf);
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
            res.render('conferences.njk', {
              confs: confArr
            });
            return;
          }

          next.value.then(loop);
        })();

      }
    }).catch(() => {
      res.render('conferences.njk', {
        empty: true
      });
    });
});

export default router;
