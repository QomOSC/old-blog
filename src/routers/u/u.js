import { Router } from 'express';

const { logged } = rootRequire('./perms');
const { Post } = rootRequire('./models');

const router = new Router();

router.get('/u', logged, (req, res) => {
  Post
  .find({ author: req.member.user._id })
  .limit(9)
  .sort({ createdAt: -1 })
  .then(posts => {
    if (JSON.stringify(posts) !== '[]') {

      const allPosts = [];

      function* getResponse() {

        yield new Promise(resolve => {


          for (let i = 0; i < posts.length; i++) {
            const onePost = {};

            onePost.id = posts[i]._id;
            onePost.title = posts[i].title;
            onePost.content = posts[i].content;
            onePost.minutes = posts[i].minutes;
            onePost.avatar = posts[i].avatar;
            onePost.viewers = posts[i].viewers.length;
            onePost.likes = posts[i].likes.length;

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
  }).catch(() => {
    res.reply.error();
  });
});

export default router;
