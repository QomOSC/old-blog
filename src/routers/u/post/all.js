import { Router } from 'express';

const { Post } = rootRequire('./models');
const { logged } = rootRequire('./perms');

const router = new Router();

router.get('/u/post/all', logged, (req, res) => {
  Post
    .find({ author: req.member.user._id })
    .sort({ createdAt: -1 })
    .limit(9)
    .then(authorposts => {

      if (authorposts === 0) {
        res.render('u/post/all.njk', {
          member: req.member.user,
          empty: true
        });
      } else {

        const posts = [];

        function* getResponse() {
          for (const i of authorposts) {
            yield new Promise(resolve => {

              let content = i.content.split('').slice(0, 130);
              content.push('.', '.', '.');
              content = content.join('');

              const onePost = {
                _id: i._id,
                title: i.title,
                likes: i.likes.length,
                viewers: i.viewers.length,
                avatar: i.avatar,
                content
              };

              posts.push(onePost);

              resolve();
            });
          }
        }

        const iterator = getResponse();
        (function loop() {

          const next = iterator.next();
          if (next.done) {
            res.render('u/post/all.njk', {
              member: req.member.user,
              posts
            });
            return;
          }

          next.value.then(loop);
        })();

      }

  }).catch(() => {
    res.reply.error();
  });
});

export default router;
