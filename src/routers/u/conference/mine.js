import { Router } from 'express';

const { Conference } = rootRequire('./models');
const { logged } = rootRequire('./perms');

const router = new Router();

router.get('/u/conference', logged, (req, res) => {
  Conference.find({ provider: req.member.user._id }).then(confs => {
    if (JSON.stringify(confs) !== '[]') {
      res.render('u/conference/mine.njk', {
        confs
      });
    } else {
      res.render('u/conference/mine.njk', {
        empty: true
      });
    }
  }).catch(() => {
    res.reply.error();
  });
});

export default router;
