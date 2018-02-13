import { Router } from 'express';

const { Conference } = rootRequire('./models');
const { logged } = rootRequire('./perms');

const router = new Router();

router.get('/u/conference', logged, async(req, res) => {

  const confs = await Conference.find({ provider: req.member.user._id });
  
  if (confs.length !== 0) {
    res.render('u/conference/mine.njk', {
      member: req.member.user,
      confs
    });
  } else {
    res.render('u/conference/mine.njk', {
      member: req.member.user,
      empty: true
    });
  }
});

export default router;
