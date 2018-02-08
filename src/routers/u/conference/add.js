import { Router } from 'express';

const { Conference } = rootRequire('./models');
const { logged } = rootRequire('./perms');
const { limit } = rootRequire('./utils');

const router = new Router();
router.get('/u/conference/add', logged, (req, res) => {
  res.render('u/conference/add.njk', {
    member: req.member.user
  });
});

router.post(
  '/u/conference/add',
  logged,
  limit,
  (req, res) => {
    const newConference = new Conference({
      provider: req.member.user._id,
      title: req.body.title,
      description: req.body.description
    });

    newConference.save().then(() => {
      // ALL OK
      res.json({ type: 2, text: 0 });
    }).catch(() => {
      // Something is wrong
      res.json({ type: 0, text: 0 });
    });
});

export default router;
