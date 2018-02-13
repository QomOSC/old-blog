import { Router } from 'express';

const { Post } = rootRequire('./models');

const router = new Router();

router.post('/post/like/:id', async(req, res) => {
  if (req.member.user) {

    const post = await Post.findOne({ _id: req.params.id });

    if (post) {
      
      if (post.likes.indexOf(req.member.user._id) === -1) {
        post.likes.push(req.member.user._id);

        post.save().then(() => {
          res.json({ type: 0, text: 0 });
        }).catch(() => {
          res.json({ type: 2, text: 0 });
        });

      } else {
        // Duplicate
        res.json({ type: 0, text: 1 });
      }
    } else {
      res.json({ type: 2, text: 0 });
    }
  } else {
    // Not Logged in
    res.json({ type: 2, text: 1 });
  }
});

export default router;
