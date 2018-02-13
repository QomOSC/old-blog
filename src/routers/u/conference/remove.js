import { Router } from 'express';

const { Conference } = rootRequire('./models');
const { logged } = rootRequire('./perms');

const router = new Router();

router.post(
  '/u/conference/remove',
  logged,
  async(req, res) => {

    const conf = await Conference.findOne({
      provider: req.body.provider,
      _id: req.body.id
    });
    
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
});

export default router;
