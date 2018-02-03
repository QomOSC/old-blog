import { Router } from 'express';

const { Conference } = rootRequire('./models');

const router = new Router();

router.get('/conferences', (req, res) => {
  Conference
    .find({ type: { $in: [3, 4] } })
    .sort({ createdAt: -1 })
    .limit(20)
    .then(confs => {
      if (JSON.stringify(confs) === '[]') {
        res.render('conferences.njk', {
          empty: true
        });
      } else {
        res.render('conferences.njk', {
          confs
        });
      }
    }).catch(() => {
      res.render('conferences.njk', {
        empty: true
      });
    });
});

export default router;
