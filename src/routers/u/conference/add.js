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

  let providers = req.body.providers
    .split(',', 5)
    .map(x => x.trim().replace(/\s/g, '_').trim());

  providers = Array.from(new Set(providers));

  for (let i = 0; i < providers.length; i++) {
    if (!providers[i].trim()) {
      providers.splice(i, 1);
    }
  }

  const newConference = new Conference({
    author: req.member.user._id.toString(),
    title: req.body.title,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    providers
  });

  try {
    await newConference.save();
    res.json({ type: 0, text: 0 });
  } catch (e) {
    res.json({ type: 2, text: 0 });
  }
});

export default router;
