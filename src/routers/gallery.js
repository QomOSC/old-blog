import { Router } from 'express';

const { Gallery, Member } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/gallery', async(req, res) => {
  const page = parseInt(req.query.page) || 0,
  start = page * 12,
  stop = page * 12 + 12;

  const re = new RegExp(`.*${req.query.q || ''}.*`);

  const photos = await Gallery
    .find({ title: re })
    .select('-__v -_id')
    .sort({ createdAt: -1 })
    .skip(start)
    .limit(stop)
    .lean();

  if (!photos.length) {
    if (req.query.q) {
      res.render('gallery.njk', {
        type: 1,
        query: req.query.q,
        empty: true
      });
    } else {
      res.render('gallery.njk', {
        type: 0,
        empty: true
      });
    }
    return;
  }

  for (const i of photos.keys()) {
    photos[i].createdAt = moment(photos[i].createdAt);

    photos[i].author = await Member
      .findOne({ _id: photos[i].photographer })
      .select('-password -_id -__v -submembers -articles -createdAt -type');
  }

  if (req.query.q) {
    res.render('gallery.njk', {
      photos,
      type: 1,
      query: req.query.q,
    });
    return;
  }

  res.render('gallery.njk', {
    type: 0,
    photos
  });
});

export default router;
