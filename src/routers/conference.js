import { Router } from 'express';

const { Conference, Member } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/conference', async(req, res) => {
  const page = parseInt(req.query.page) || 0,
        start = page * 12,
        stop = page * 12 + 12;

  const re = new RegExp(`.*${req.query.q || ''}.*`);

  const confs = await Conference
    .find({ description: re, type: { $in: [3, 4] } })
    .skip(start)
    .limit(stop);

  if (!confs.length) {
    if (req.query.q) {
      res.render('conference.njk', {
        type: 1,
        query: req.query.q,
        empty: true
      });
    } else {
      res.render('conference.njk', {
        type: 0,
        empty: true
      });
    }
    return;
  }

  const confArr = [];

  for (const i of confs) {

    const oneConf = {
      title: i.title,
      createdAt: moment(i.createdAt),
      description: i.description,
      avatar: i.avatar,
      provider: {},
    };

    const member = Member.findOne({ _id: i.provider });

    if (!member) {
      res.reply.error();
      return;
    }

    oneConf.provider.fname = member.fname;
    oneConf.provider.lname = member.lname;
    oneConf.provider.username = member.username;
    oneConf.provider.avatar = member.avatar;

    confArr.push(oneConf);
  }

  if (req.query.q) {
    res.render('conference.njk', {
      confs: confArr,
      type: 1,
      query: req.query.q,
    });
    return;
  }

  res.render('conference.njk', {
    confs: confArr,
    type: 0
  });
});

export default router;
