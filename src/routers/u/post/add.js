import { Router } from 'express';

const { Post } = rootRequire('./models');
const { logged } = rootRequire('./perms');

const router = new Router();
router.get('/u/post/add', logged, (req, res) => {
  res.render('u/post/add.njk');
});

router.post('/u/post/add', logged, (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    minutes: req.body.minutes,
    author: req.member.user._id
  });

  post.save().then(() => {
    res.json({ body: req.body, sent: true });
  }).catch(() => {
    res.json({ body: req.body, sent: false });
  });
});

export default router;
