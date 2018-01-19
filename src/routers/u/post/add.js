import { Router } from 'express';

const { Post, Member } = rootRequire('./models');
const { logged } = rootRequire('./perms');

const router = new Router();
router.get('/u/post/add', logged, (req, res) => {
  res.render('u/post/add.njk');
});

router.post('/u/post/add', logged, (req, res) => {
  if (req.body.title && req.body.content && req.body.minutes) {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      minutes: req.body.minutes,
      author: req.member.user._id
    });

    post.save().then(() => {

      Member.findOne({ _id: req.member.user._id }).then(member => {
        if (member) {
          member.posts.push(post._id);
        } else {
          res.json({ type: 2 });
        }
      }).catch(() => {
        res.json({ type: 2 });
      });
      res.json({ type: 0 });
    }).catch(() => {
      res.json({ type: 2 });
    });
  } else {
    res.json({ type: 2 });
  }
});

export default router;
