import { Router } from 'express';

const { Conference, Member } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/conferences', (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const start = page * 12,
        stop = page * 12 + 12;

  const re = new RegExp(`.*${req.query.q || ''}.*`);

  Conference
    .find({ description: re, type: { $in: [3, 4] } })
    .skip(start)
    .limit(stop)
    .then(confs => {
    if (confs.length === 0) {
      if (req.query.q) {
        res.render('conferences.njk', {
          type: 1,
          query: req.query.q,
          empty: true
        });
      } else {
        res.render('conferences.njk', {
          type: 0,
          empty: true
        });
      }
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
          if (req.query.q) {
            res.render('conferences.njk', {
              confs: confArr,
              type: 1,
              query: req.query.q,
            });
          } else {
            res.render('conferences.njk', {
              confs: confArr,
              type: 0
            });
          }
          return;
        }

        next.value.then(loop);
      })();
    }
  });
});

export default router;
