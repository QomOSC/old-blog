import { Router } from 'express';

const { Post, Member } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/', (req, res) => {

  Post
    .find({})
    .sort({ createdAt: -1 })
    .limit(20)
    .then(doc => {

      if (JSON.stringify(doc) === '[]') {
        res.render('home.njk', {
          logged: req.member.user,
          empty: true
        });
      } else {

        const posts = [];

        function* getResponse() {
          for (const i of doc) {
            yield new Promise(resolve => {
              let content = i.content.split('').slice(0, 130);
              content.push('.', '.', '.');
              content = content.join('');

              const onePost = {
                _id: i._id,
                title: i.title,
                createdAt: moment(i.createdAt),
                likes: i.likes.length,
                viewers: i.viewers.length,
                avatar: i.avatar,
                author: {},
                content
              };

              Member.findOne({ _id: i.author }).then(member => {
                if (member) {
                  onePost.author.fname = member.fname;
                  onePost.author.lname = member.lname;
                  onePost.author.username = member.username;
                  onePost.author.avatar = member.avatar;

                  posts.push(onePost);
                  resolve();
                } else {
                  res.reply.error();
                }
              }).catch(() => {
                res.reply.error();
              });
            });
          }
        }

        const iterator = getResponse();
        (function loop() {

          const next = iterator.next();
          if (next.done) {
            res.render('home.njk', {
              logged: req.member.user,
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
