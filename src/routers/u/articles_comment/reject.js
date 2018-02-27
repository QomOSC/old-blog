import { Router } from 'express';

const { Comment } = rootRequire('./models');

const router = new Router();


router.post('/u/article-comments/reject/:id', async(req, res) => {
  const comment = await Comment.findOne({ _id: req.params.id });

  console.log(comment.author);
  console.log(req.member.user._id);

  if (comment.author.toString() === req.member.user._id.toString()) {
    comment.remove().then(() => {
      // Done
      res.json({ type: 0 });
    }).catch(() => {
      // Error
      res.json({ type: 2, text: 1 });
    });
  } else {
    res.json({ type: 2, text: 2 });
  }
});

export default router;
