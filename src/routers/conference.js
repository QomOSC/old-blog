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
    .findOne({ _id: req.params.id, type: { $in: [3, 4] } });
  } catch (e) {
    res.reply.error();
    return;
  }

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
    start: conf.start,
    end: conf.end,
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
