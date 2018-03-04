import { Router } from 'express';

const { Conference } = rootRequire('./models');
const { logged } = rootRequire('./perms');

const router = new Router();

router.get('/u/conference', logged, async(req, res) => {

  const confs = await Conference.find({
    author: req.member.user._id.toString()
  });

  if (confs.length !== 0) {
    res.render('u/conference/mine.njk', {
      confs
    });
    return;
  }

  res.render('u/conference/mine.njk', {
    empty: true
  });
});

export default router;
