import { Router } from 'express';

const { Gallery } = rootRequire('./models');
const { logged } = rootRequire('./perms');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/u/gallery/', logged, async(req, res) => {
  const page = parseInt(req.query.page) || 0,
        start = page * 12,
        stop = page * 12 + 12;

  const photos = await Gallery
  .find({ photographer: req.member.user._id })
  .select('-__v -photographer')
  .skip(start)
  .limit(stop)
  .lean();

  if (!photos.length) {
    res.render('u/gallery/mygallery.njk', {
      empty: true
    });
    return;
  }

  for (const i of photos.keys()) {
    photos[i].createdAt = moment(photos[i].createdAt);
  }

  res.render('u/gallery/mygallery.njk', {
    photos
  });
});

export default router;
