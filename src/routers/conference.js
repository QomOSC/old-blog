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
  .sort({ createdAt: -1 })
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

    let description = i.description.split('').slice(0, 130);
    description.push('.', '.', '.');
    description = description.join('');

    const oneConf = {
      _id: i._id,
      title: i.title,
      createdAt: moment(i.createdAt),
      avatar: i.avatar,
      description
    };

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
    providers: []
  };

  if (!conf.providers) {
    res.reply.error();
    return;
  }

  for (const i of conf.providers) {
    const provider = await Member.findOne({ username: i });

    if (provider) {
      const providerInfo = {
        fname: provider.fname,
        lname: provider.lname,
        username: provider.username,
        avatar: provider.avatar,
        description: provider.description
      };

      info.providers.push(providerInfo);
    }
  }

  res.render('conference.njk', { info });
});

export default router;
