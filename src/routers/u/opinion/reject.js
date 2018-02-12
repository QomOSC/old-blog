import { Router } from 'express';

const { Opinion } = rootRequire('./models');

const router = new Router();


router.post('/u/opinion/reject/:id', (req, res) => {
  if (req.member.user && req.member.user.type >= 3 && req.params.id) {
    Opinion.findOne({ _id: req.params.id }).then(op => {

      op.remove().then(() => {
        // Done
        res.json({ type: 0 });
      }).catch(() => {
        // Error
        res.json({ type: 2, text: 1 });
      });
    }).catch(() => {
      // Error
      res.json({ type: 2, text: 1 });
    });
  } else {
    // Member is not an admin
    res.json({ type: 2, text: 0 });
  }
});

export default router;
