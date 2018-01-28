import { Router } from 'express';

const { logged } = rootRequire('./perms');
const { Post } = rootRequire('./models');

const router = new Router();

router.get('/u/post/all', logged, (req, res) => {
  Post.find({ author: req.member.user._id }).then(authorposts => {
    res.render('u/post/all.njk', {
      member: req.member.user,
      authorposts
    });
  }).catch(() => {
    res.reply.error();
  });
});

export default router;
