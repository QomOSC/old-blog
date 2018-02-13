import { Router } from 'express';

const { Post } = rootRequire('./models');
const { logged } = rootRequire('./perms');

const router = new Router();

router.get('/u/post/:id/edit', logged, async(req, res) => {

  const post = await Post.findOne({ _id: req.params.id });

  if (post && post.author.toString() === req.member.user._id.toString()) {
    res.render('u/post/edit.njk', {
      post,
      member: req.member.user
    });
  } else {
    res.reply.notFound();
  }
});

router.post(
  '/u/post/edit',
  logged,
  async(req, res) => {

  if (req.body.title && req.body.content && req.body.minutes && req.body.id) {

    const post = await Post.findOne({
      _id: req.body.id,
      author: req.member.user._id.toString()
    });
    
    if (post) {
      post.title = req.body.title;
      post.content = req.body.content;
      post.minutes = req.body.minutes;

      post.save().then(() => {
        res.json({ type: 0 });
      }).catch(() => {
        // Error
        res.json({ type: 2, text: 0 });
      });
    }
  } else {
    // Error
    res.json({ type: 2, text: 0 });
  }
});

export default router;
