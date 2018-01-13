import { Router } from 'express';

const { Post } = rootRequire('./models');
const { logged } = rootRequire('./perms');

const router = new Router();

router.post('/post/:id/like/', logged, (req, res) => {
  Post.findOne({ _id: req.params.id }).then(post => {
    if (post) {

      if (post.likes.indexOf(req.member.user._id) === -1) {
        post.likes.push(req.member.user._id);

        post.save().then(() => {
          res.send('done');
        }).catch(() => {
          res.send('err');
        });
      } else {
        res.send('done');
      }
    } else {
      res.send('err');
    }
  }).catch(() => {
    res.send('err');
  });
});

export default router;
