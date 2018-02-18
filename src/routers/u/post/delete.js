import { Router } from 'express';

const { Post, Member, Tag } = rootRequire('./models');
const { logged } = rootRequire('./perms');
const { removeImage } = rootRequire('./utils');

const router = new Router();

router.post('/u/post/delete/:id', logged, async(req, res) => {
  const post = await Post.findOne({
    author: req.member.user._id,
    _id: req.params.id
  });
  const member = await Member.findOne({ _id: req.member.user._id });

  if (member) {
    member.posts.splice(req.params.id, 1);

    member.save().then(async() => {

      await Tag.remove({ article: post._id });

      if (post.avatar) {
        removeImage(post.avatar)
          .then(() => {
            post.remove().then(() => {
              res.json({ type: 0 });
            }).catch(() => {
              res.json({ type: 2 });
            });
          }).catch(() => {
            res.json({ type: 2 });
          });
      } else {
        post.remove().then(() => {
          res.json({ type: 0 });
        }).catch(() => {
          res.json({ type: 2 });
        });
      }

    }).catch(() => {
      res.json({ type: 2 });
    });
  } else {
    res.json({ type: 2 });
  }
});

export default router;
