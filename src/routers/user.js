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
            const userInfo = {
              _id: member._id,
              fname: member.fname,
              lname: member.lname,
              createdAt: moment(member.createdAt),
              email: member.email,
              username: member.username,
              description: member.description,
              avatar: member.avatar
            };

            user.push(userInfo);

            Post.find({ author: member._id }).then(posts => {
              user.push(posts);
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
            console.log(user);

            res.render('user.njk', {
              member: user[0],
              posts: user[1]
            });

            return;
          }

          next.value.then(loop);
        }());

      } else {
        res.reply.notFound();
      }
  }).catch(() => {
    res.reply.notFound();
  });
});

export default router;
