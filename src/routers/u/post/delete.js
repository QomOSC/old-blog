import { Router } from 'express';

const { logged } = rootRequire('./perms');
const { Post, Member } = rootRequire('./models');

const router = new Router();

router.post('/u/post/delete/:id', logged, (req, res) => {
  Post.remove({
    author: req.member.user._id,
    _id: req.params.id
  }).then(() => {

    Member.findOne({ _id: req.member.user._id }).then(member => {
      if (member) {
        member.posts.splice(req.params.id, 1);

        member.save().then(() => {
          res.json({ type: 0 });
        }).catch(() => {
          res.json({ type: 2 });
        });
      } else {
        res.json({ type: 2 });
      }
    }).catch(() => {
      res.json({ type: 2 });
    });
  }).catch(() => {
    res.json({ type: 2 });
  });
});

export default router;
