import { Router } from 'express';

const { Conference } = rootRequire('./models');
const perms = rootRequire('./perms');

const router = new Router();

router.post(
  '/u/conference/manage/decline',
  perms.logged,
  perms.u.admin,
  (req, res) => {
    Conference.remove({
      _id: req.body.id,
      type: 1
    }).then(() => {
      res.json({ type: 0 });
    }).catch(() => {
      res.json({ type: 2, text: 0 });
    });
});

export default router;
