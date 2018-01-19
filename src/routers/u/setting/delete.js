import { Router } from 'express';

const { logged } = rootRequire('./perms');
const { Member, Post } = rootRequire('./models');

const router = new Router();

router.post('/u/setting/delete', logged, (req, res) => {
  Member.remove({ _id: req.member.user._id }).then(() => {

    Post.remove({ author: req.member.user._id }).then(() => {

      req.member.logout();
      // Done
      res.json({ type: 0 });

    }).catch(() => {
      // Error
      res.json({ type: 2, text: 0 });
    });

  }).catch(() => {
    // Error
    res.json({ type: 2, text: 0 });
  });
});

export default router;
