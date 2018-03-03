import { Router } from 'express';

const { Conference } = rootRequire('./models');
const { logged } = rootRequire('./perms');

const router = new Router();
router.get('/u/conference/add', logged, (req, res) => {
  res.render('u/conference/add.njk');
});

router.post(
  '/u/conference/add',
  logged,
  async(req, res) => {

  const newConference = new Conference({
    provider: req.member.user._id,
    title: req.body.title,
    description: req.body.description
  });

  try {
    await newConference.save();
    res.json({ type: 2, text: 0 });
  } catch (e) {
    res.json({ type: 0, text: 0 });
  }
});

export default router;
