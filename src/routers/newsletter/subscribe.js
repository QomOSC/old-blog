import { Router } from 'express';

const { Newsletter } = rootRequire('./models');
const { validator } = rootRequire('./utils');

const router = new Router();

router.post('/subscribe', async(req, res) => {
  req.body.email = req.body.email.toLowerCase();

  if (validator.e(req.body.email)) {

    const member = await Newsletter.findOne({ email: req.body.email });

    if (member) {
      // It was in it already
      res.json({ type: 0, text: 0 });
    } else {
      const newMember = new Newsletter({
        email: req.body.email
      });

      newMember.save().then(() => {
        // New email added successfully
        res.json({ type: 0, text: 1 });
      }).catch(() => {
        // Error
        res.json({ type: 2, text: 0 });
      });
    }
  } else {
    // Wrong Email
    res.json({ type: 2, text: 1 });
  }
});

export default router;
