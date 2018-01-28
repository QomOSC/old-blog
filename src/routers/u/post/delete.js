import { Router } from 'express';

const { logged } = rootRequire('./perms');
const { Post, Member } = rootRequire('./models');
const { removeImage } = rootRequire('./utils');

const router = new Router();

router.post('/u/post/delete/:id', logged, (req, res) => {
  Post.findOne({
    author: req.member.user._id,
    _id: req.params.id
  }).then(post => {

    Member.findOne({ _id: req.member.user._id }).then(member => {
      if (member) {
        member.posts.splice(req.params.id, 1);

        member.save().then(() => {

          removeImage(post.avatar);

          post.remove().then(() => {
            res.json({ type: 0 });
          }).catch(() => {
            res.json({ type: 2 });
          });

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
