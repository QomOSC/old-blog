import { Router } from 'express';

const { Comment } = rootRequire('./models');

const router = new Router();


router.post('/u/comments/accept/:id', async(req, res) => {
  if (req.member.user &&
    req.member.user.type >= 3 &&
    req.params.id) {

    const comment = await Comment.findOne({ _id: req.params.id });

    comment.type = 2;
    comment.admin = req.member.user._id;

    if (req.body.answer) {
      comment.answer = req.body.answer;
    }

    comment.save().then(() => {
      // Done
      res.json({ type: 0 });
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
