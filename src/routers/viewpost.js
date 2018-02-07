import { Router } from 'express';

const { Post, Member } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/viewpost/:id', (req, res) => {
  req.params.id = req.params.id.toLowerCase();

  Post.findOne({ _id: req.params.id }).then(post => {
      if (post) {
        const onePost = { post, author: {}, other: {}, liked: false };

        onePost.other.createdAt = moment(post.createdAt);
        onePost.other.likes = post.likes.length;
        onePost.other.viewers = post.viewers.length;

        if (req.member.user) {
          onePost.liked =
            post.likes.indexOf(req.member.user._id) !== -1 ? true : false;
        }

        Member.findOne({ _id: post.author }).then(member => {
          if (member) {
            onePost.author.avatar = member.avatar;
            onePost.author.fname = member.fname;
            onePost.author.lname = member.lname;
            onePost.author.username = member.username;
            onePost.author.description = member.description;

            res.render('viewpost.njk', {
              p: onePost
            });
          } else {
            res.reply.notFound();
          }
        }).catch(() => {
          res.reply.notFound();
        });
      } else {
        res.reply.notFound();
      }
  }).catch(() => {
    res.reply.notFound();
  });
});

// Add viewer IP

router.post('/viewpost/:id', (req, res) => {
  req.params.id = req.params.id.toLowerCase();

  Post.findOne({ _id: req.params.id }).then(post => {
    if (post) {
      if (!post.viewers.includes(req.body.ip)) {
        post.viewers.push(req.body.ip);

        post.save().then(() => {
          res.json({ done: true });
        }).catch(() => {
          res.json({ done: false });
        });
      } else {
        res.json({ done: true });
      }
    } else {
      res.json({ done: false });
    }
  }).catch(() => {
    res.json({ done: false });
  });
});

export default router;
