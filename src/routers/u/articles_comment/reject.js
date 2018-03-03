import { Router } from 'express';

const { Comment } = rootRequire('./models');

const router = new Router();


router.post('/u/article-comments/reject/:id', async(req, res) => {
  const comment = await Comment.findOne({ _id: req.params.id });

  if (comment.author.toString() !== req.member.user._id.toString()) {
    res.json({ type: 2, text: 2 });
    return;
  }

  try {
    await comment.remove();
    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 1 });
  }
});

export default router;
