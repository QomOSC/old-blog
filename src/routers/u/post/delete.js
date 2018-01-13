import { Router } from 'express';

const { logged } = rootRequire('./perms');
const { Post } = rootRequire('./models');

const router = new Router();

router.get('/u/post/delete/:id', logged, (req, res) => {
  Post.remove({
    author: req.member.user._id,
    _id: req.params.id
  }).then(() => {
    res.send('done');
  }).catch(() => {
    res.reply.error();
  });
});

export default router;
