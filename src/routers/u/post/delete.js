import { Router } from 'express';

const { logged } = rootRequire('./perms');
const { Post } = rootRequire('./models');

const router = new Router();

router.post('/u/post/delete/:id', logged, (req, res) => {
  Post.remove({
    author: req.member.user._id,
    _id: req.params.id
  }).then(() => {
    res.json({ type: 0 });
  }).catch(() => {
    res.json({ type: 2 });
  });
});

export default router;
