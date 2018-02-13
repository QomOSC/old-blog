import { Router } from 'express';

const { Post } = rootRequire('./models');
const { logged } = rootRequire('./perms');

const router = new Router();

router.get('/u', logged, async(req, res) => {

  const posts = await Post
  .find({ author: req.member.user._id })
  .limit(9)
  .sort({ createdAt: -1 });

  if (posts.length !== 0) {

    const allPosts = [];

    function* getResponse() {

      yield new Promise(resolve => {


        for (const i of posts) {

          const onePost = {};

          let content = i.content.split('').slice(0, 130);
          content.push('.', '.', '.');
          content = content.join('');

          onePost.id = i._id;
          onePost.title = i.title;
          onePost.content = content;
          onePost.minutes = i.minutes;
          onePost.avatar = i.avatar;
          onePost.viewers = i.viewers.length;
          onePost.likes = i.likes.length;

          allPosts.push(onePost);
        }

        resolve();
      });
    }

    const iterator = getResponse();
    (function loop() {

      const next = iterator.next();
      if (next.done) {
        res.render('u/u.njk', {
          member: req.member.user,
          posts: allPosts
        });

        return;
      }

      next.value.then(loop);
    })();

  } else {
    res.render('u/u.njk', {
      member: req.member.user,
      postEmpty: true
    });
  }
});

export default router;
