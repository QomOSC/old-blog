import { Router } from 'express';

const { Conference } = rootRequire('./models');
const { logged } = rootRequire('./perms');

const router = new Router();

router.post(
  '/u/conference/remove',
  logged,
  (req, res) => {
    Conference.findOne({
      provider: req.body.provider,
      _id: req.body.id
    }).then(conf => {
      if (conf) {
        conf.remove().then(() => {
          // OK
          res.json({ type: 0 });
        }).catch(() => {
          // Error
          res.json({ type: 2, text: 0 });
        });
      } else {
        // Error
        res.json({ type: 2, text: 0 });
      }
    }).catch(() => {
      // Error
      res.json({ type: 2, text: 0 });
    });
});

export default router;
