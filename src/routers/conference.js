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
    return;
  }

  const confArr = [];

  for (const i of confs) {

    const oneConf = {
      _id: i._id,
      title: i.title,
      createdAt: moment(i.createdAt),
      description: i.description,
      avatar: i.avatar,
      provider: {},
    };

    const member = await Member.findOne({ _id: i.provider });

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
    res.render('conferences.njk', {
      confs: confArr,
      type: 1,
      query: req.query.q,
    });
    return;
  }

  res.render('conferences.njk', {
    confs: confArr,
    type: 0
  });
});

router.get('/conference/:id', async(req, res) => {
  const conf = await Conference
  .findOne({ _id: req.params.id, type: { $in: [3, 4] } });

  if (!conf) {
    res.reply.notFound();
    return;
  }

  const info = {
    _id: conf._id,
    title: conf.title,
    description: conf.description,
    createdAt: moment(conf.createdAt),
    attenders: conf.attender.length,
    provider: {}
  };

  const provider = await Member.findOne({ _id: conf.provider });

  if (!provider) {
    res.reply.error();
    return;
  }

  info.provider.fname = provider.fname;
  info.provider.lname = provider.lname;
  info.provider.username = provider.username;
  info.provider.avatar = provider.avatar;
  info.provider.description = provider.description;

  res.render('conference.njk', { info });
});

export default router;
