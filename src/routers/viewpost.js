import { Router } from 'express';

const { Post } = rootRequire('./models');

const router = new Router();

router.get('/viewpost/:id', (req, res) => {
  req.params.id = req.params.id.toLowerCase();

  Post.findOne({ _id: req.params.id }).then(post => {
      if (post) {
        res.render('viewpost.njk', {
          post,
          member: req.member.user
        });
      } else {
        res.reply.notFound();
      }
  }).catch(() => {
    res.reply.notFound();
  });
});

router.post('/viewpost/:id', (req, res) => {
  req.params.id = req.params.id.toLowerCase();

  Post.findOne({ _id: req.params.id }).then(post => {
    if (post) {
      if (!post.viewers.includes(req.body.ip)) {
        post.viewers.push(req.body.ip);

        post.save().then(() => {
          res.json({ done: true });
        }).catch(() => {
          res.json({ done: false });
        });
      } else {
        res.json({ done: true });
      }
    } else {
      res.json({ done: false });
    }
  }).catch(() => {
    res.json({ done: false });
  });
});

export default router;
