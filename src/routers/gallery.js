import { Router } from 'express';

const { Gallery } = rootRequire('./models');

const router = new Router();

router.get('/gallery', (req, res) => {
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
    .find()
    .sort({ createdAt: -1 })
    .skip(start)
    .limit(stop)
    .then(photos => {
      if (JSON.stringify(photos) === '[]') {
        res.render('gallery.njk', {
          empty: true
        });
      } else {
        res.render('gallery.njk', {
          photos
        });
      }
    }).catch(() => {
      res.reply.notFound();
    });
});

export default router;
