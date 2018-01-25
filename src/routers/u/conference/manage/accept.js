import { Router } from 'express';

const { Conference } = rootRequire('./models');
const perms = rootRequire('./perms');

const router = new Router();

router.post(
  '/u/conference/manage/accept',
  perms.logged,
  perms.u.admin,
  (req, res) => {
    Conference.findOne({ _id: req.body.id, type: 1 }).then(conf => {
      if (conf) {
        conf.type = 2;

        conf.save().then(() => {
          res.json({ type: 0 });
        }).catch(() => {
          res.json({ type: 2, text: 0 });
        });
      } else {
        res.json({ type: 2, text: 0 });
      }
    }).catch(() => {
      res.json({ type: 2, text: 0 });
    });
});

export default router;
