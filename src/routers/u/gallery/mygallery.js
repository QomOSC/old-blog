import { Router } from 'express';

const { logged } = rootRequire('./perms');
const { Gallery } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/u/gallery/', logged, (req, res) => {
  const page = Math.abs(parseInt(req.query.page) - 1);
  let start, stop;

  if (page.toString() !== NaN.toString()) {
    start = page * 12;
    stop = page * 12 + 12;
  } else {
    start = 0;
    stop = 12;
  }

  Gallery
  .find({ photographer: req.member.user._id })
  .skip(start)
  .limit(stop)
  .then(photos => {
    if (JSON.stringify(photos) === '[]') {
      res.render('u/gallery/mygallery.njk', {
        empty: true
      });
    } else {

      const allPhotos = [];

      function* getResponse() {
        for (const i of photos) {
          yield new Promise(resolve => {

            const onePhoto = {
              _id: i._id,
              title: i.title,
              photo: i.photo,
              createdAt: moment(i.createdAt),
              author: {},
            };
            allPhotos.push(onePhoto);
            resolve();
          });
        }
      }

      const iterator = getResponse();
      (function loop() {

        const next = iterator.next();
        if (next.done) {
          res.render('u/gallery/mygallery.njk', {
            photos: allPhotos
          });
          return;
        }

        next.value.then(loop);
      })();
    }
  });
});

export default router;
