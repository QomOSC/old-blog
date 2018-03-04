import { Router } from 'express';

const { Conference } = rootRequire('./models');
const { logged } = rootRequire('./perms');

const router = new Router();

router.post(
  '/u/conference/remove',
  logged,
  async(req, res) => {

  const conf = await Conference.findOne({
    author: req.body.provider,
    _id: req.body.id
  });

  if (!conf) {
    res.json({ type: 2, text: 0 });
    return;
  }

  try {
    await conf.remove();
    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 0 });
  }
});

export default router;
