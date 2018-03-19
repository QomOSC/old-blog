import { Router } from 'express';

const { Conference, Member } = rootRequire('./models');
const { moment, shorten } = rootRequire('./utils');

const router = new Router();

router.get('/conference', async(req, res) => {
  const page = parseInt(req.query.page) || 0,
        start = page * 12,
        stop = page * 12 + 12;

  const re = new RegExp(`.*${req.query.q || ''}.*`);

  const confs = await Conference
    .find({ description: re, type: { $in: [3, 4] } })
    .select('-__v -providers -attender -type')
    .sort({ createdAt: -1 })
    .skip(start)
    .limit(stop)
    .lean();

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

  for (const i of confs.keys()) {
    confs[i].description = shorten(confs[i].description);
    confs[i].createdAt = moment(confs[i].createdAt);
  }

  if (req.query.q) {
    res.render('conferences.njk', {
      type: 1,
      query: req.query.q,
      confs
    });
    return;
  }

  res.render('conferences.njk', {
    type: 0,
    confs
  });
});


router.get('/conference/:id', async(req, res) => {
  let conf;

  try {
    conf = await Conference
      .findOne({ _id: req.params.id, type: { $in: [3, 4] } })
      .select('-__v -type')
      .lean();
  } catch (e) {
    res.reply.notFound();
    return;
  }

  if (!conf) {
    res.reply.notFound();
    return;
  }

  conf.createdAt = moment(conf.createdAt);
  conf.attenders = conf.attender.length;

  if (!conf.providers) {
    res.reply.error();
    return;
  }

  conf.provs = [];

  for (const i of conf.providers.keys()) {
    const provider = await Member
      .findOne({ username: conf.providers[i] })
      .select('-_id -__v -type -articles -submembers -password -createdAt');

    if (provider) {
       conf.provs.push(provider);
    }
  }

  res.render('conference.njk', {
    info: conf
  });
});

export default router;
