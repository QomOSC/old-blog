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
  .skip(start)
  .limit(stop);

  if (photos.length === 0) {
    res.render('u/gallery/mygallery.njk', {
      empty: true
    });
  } else {

    const allPhotos = [];

    for (const i of photos) {
      const onePhoto = {
        _id: i._id,
        title: i.title,
        photo: i.photo,
        createdAt: moment(i.createdAt),
        author: {},
      };
      allPhotos.push(onePhoto);
    }

    res.render('u/gallery/mygallery.njk', {
      photos: allPhotos
    });
  }
});

export default router;
