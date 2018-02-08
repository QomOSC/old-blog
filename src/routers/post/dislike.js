import { Router } from 'express';

const { Post } = rootRequire('./models');
const { limit } = rootRequire('./utils');

const router = new Router();

router.post('/post/dislike/:id', limit, (req, res) => {
  if (req.member.user) {
    Post.findOne({ _id: req.params.id }).then(post => {
      if (post) {

        if (post.likes.indexOf(req.member.user._id) !== -1) {

          post.likes.splice(req.member.user._id, 1);

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
    }).catch(() => {
      res.json({ type: 2, text: 0 });
    });
  } else {
    res.json({ type: 2, text: 1 });
  }
});

export default router;
