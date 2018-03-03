import { Router } from 'express';

const { Conference } = rootRequire('./models');
const perms = rootRequire('./perms');

const router = new Router();

router.post(
  '/u/conference/manage/decline',
  perms.logged,
  perms.u.admin,
  async(req, res) => {

  try {
    await Conference.remove({ _id: req.body.id, type: 1 });
    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 0 });
  }
});

export default router;
