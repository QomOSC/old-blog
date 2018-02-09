import { Router } from 'express';

const { Conference, Member } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/conferences', (req, res) => {
  const page = Math.abs(parseInt(req.query.page) - 1);
  let start, stop;

  if (page.toString() !== NaN.toString()) {
    start = page * 12;
    stop = page * 12 + 12;
  } else {
    start = 0;
    stop = 12;
  }

  if (req.query.q) {
    const re = new RegExp(`.*${req.query.q}.*`);

    Conference
      .find({ description: re, type: { $in: [3, 4] } })
      .skip(start)
      .limit(stop)
      .then(confs => {
      if (confs.length === 0) {
        res.render('conferences.njk', {
          type: 1,
          query: req.query.q,
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
              confs: confArr,
              type: 1,
              query: req.query.q,
            });
            return;
          }

          next.value.then(loop);
        })();
      }
    });
  } else {
  Conference
    .find({ type: { $in: [3, 4] } })
    .sort({ createdAt: -1 })
    .limit(20)
    .then(confs => {
      if (JSON.stringify(confs) === '[]') {
        res.render('conferences.njk', {
          empty: true,
          type: 0
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
              confs: confArr,
              type: 0
            });
            return;
          }

          next.value.then(loop);
        })();

      }
    }).catch(() => {
      res.render('conferences.njk', {
        empty: true,
        type: 0
      });
    });
  }
});

export default router;
