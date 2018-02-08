import { Router } from 'express';

const { Member, Post } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/user/:username', (req, res) => {
  req.params.username = req.params.username.toLowerCase();

  Member.findOne({ username: req.params.username }).then(member => {
      if (member) {

        const user = [];

        function* getResponse() {
          yield new Promise(resolve => {
            user.push({
              _id: member._id,
              fname: member.fname,
              lname: member.lname,
              type: member.type,
              createdAt: moment(member.createdAt),
              email: member.email,
              username: member.username,
              description: member.description,
              avatar: member.avatar,
              postsLength: member.posts.length
            });

            Post
              .find({ author: member._id })
              .limit(12)
              .sort({ createdAt: -1 })
              .then(posts => {
              if (JSON.stringify(posts) !== '[]') {
                const allPosts = [];

                for (let i = 0; i < posts.length; i++) {
                  const onePost = {};

                  let content = posts[i].content.split('').slice(0, 110);
                  content.push('.', '.', '.');
                  content = content.join('');

                  onePost.id = posts[i]._id;
                  onePost.title = posts[i].title;
                  onePost.content = content;
                  onePost.minutes = posts[i].minutes;
                  onePost.avatar = posts[i].avatar;
                  onePost.viewers = posts[i].viewers.length;
                  onePost.likes = posts[i].likes.length;

                  allPosts.push(onePost);
                }
                user.push(allPosts);
              } else {
                user.push('');
              }
              resolve();
            }).catch(() => {
              res.json({ type: 2 });
            });
          });
        }

        const iterator = getResponse();
        (function loop() {

          const next = iterator.next();
          if (next.done) {
            res.render('user.njk', {
              member: user[0],
              posts: user[1]
            });

            return;
          }

          next.value.then(loop);
        })();

      } else {
        res.reply.notFound();
      }
  }).catch(() => {
    res.reply.notFound();
  });
});

export default router;
