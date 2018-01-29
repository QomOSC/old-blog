import { Router } from 'express';

const { Newsletter } = rootRequire('./models');

const router = new Router();

router.post('/newsletter', (req, res) => {
  req.body.email = req.body.email.toLowerCase();

  Newsletter.findOne({ email: req.body.email }).then(member => {
    if (member) {
      res.json({ type: 0, text: 0 });
    } else {
      const newMember = new Newsletter({
        email: req.body.email
      });

      newMember.save().then(() => {
        res.json({ type: 0, text: 1 });
      }).catch(() => {
        res.json({ type: 2 });
      });
    }
  }).catch(() => {
    res.json({ type: 2 });
  });
});

export default router;
