import { Router } from 'express';

const { Comment } = rootRequire('./models');

const router = new Router();


router.post('/u/comments/reject/:id', async(req, res) => {
  if (!req.member.user || req.member.user.type <= 3 || !req.params.id) {
    // Member is not an admin
    res.json({ type: 2, text: 0 });
    return;
  }

  const comment = await Comment.findOne({ _id: req.params.id });

  try {
    await comment.remove();
    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 1 });
  }
});

export default router;
