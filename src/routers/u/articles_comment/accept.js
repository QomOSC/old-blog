import { Router } from 'express';

const { Comment } = rootRequire('./models');
const { logged } = rootRequire('./perms');
const { email } = rootRequire('./utils');

const router = new Router();


router.post('/u/article-comments/accept/:id', logged, async(req, res) => {
  const comment = await Comment.findOne({ _id: req.params.id });

  if (comment.author.toString() !== req.member.user._id.toString()) {
    res.json({ type: 2, text: 2 });
    return;
  }

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
