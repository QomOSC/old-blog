import { Router } from 'express';

const { Comment } = rootRequire('./models');
const { email } = rootRequire('./utils');

const router = new Router();


router.post('/u/comments/accept/:id', async(req, res) => {
  if (!req.member.user ||
    req.member.user.type < 3 ||
    !req.params.id) {
    // Member is not an admin
    res.json({ type: 2, text: 0 });
    return;
  }

  const comment = await Comment.findOne({ _id: req.params.id });

  comment.type = 2;
  comment.admin = req.member.user._id;

  if (req.body.answer) {
    comment.answer = req.body.answer;
  }

  email.comment.accept(comment.email).catch();

  try {
    await comment.save();
    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 1 });
  }
});

export default router;
