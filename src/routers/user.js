import { Router } from 'express';

const { Member, Post } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/user/:username', async(req, res) => {
  req.params.username = req.params.username.toLowerCase();

  const member = await Member.findOne({ username: req.params.username });

  if (member) {

    const user = [];

    function* getResponse() {
      yield new Promise(async resolve => {
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

        const posts = await Post
          .find({ author: member._id })
          .limit(12)
          .sort({ createdAt: -1 });

        if (posts.length !== 0) {
          const allPosts = [];

          for (const i of posts) {
            const onePost = {};

            let content = i.content.split('').slice(0, 110);
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
          user.push(allPosts);
        } else {
          user.push('');
        }
        resolve();
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
});

export default router;
