import { Router } from 'express';
import multer from 'multer';

const { Post, Member, Newsletter } = rootRequire('./models');
const { logged } = rootRequire('./perms');
const { email, storage } = rootRequire('./utils');

const upload = multer({ dest: 'uploads/', limits: 3000000, storage });

const router = new Router();
router.get('/u/post/add', logged, (req, res) => {
  res.render('u/post/add.njk', {
    member: req.member.user
  });
});

router.post(
  '/u/post/add',
  logged,
  upload.single('croppedImage'),
  (req, res) => {

  if (req.body.title && req.body.content && req.body.minutes) {

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      minutes: req.body.minutes,
      author: req.member.user._id,
      avatar: req.file.filename
    });

    if (req.body.tags) {
      post.tags = req.body.tags.split(',', 5).map(x => x.trim());
    }

    post.save().then(async() => {

      const member = await Member.findOne({ _id: req.member.user._id });

      if (member) {
        member.posts.push(post._id);

        member.save().then(async() => {

          const subscribers = await Newsletter.find();

          if (subscribers.length !== 0) {

            let subsArr = [];

            function* getResponse() {

              yield new Promise(resolve => {


                for (const i of subscribers) {
                  subsArr.push(i.email);
                }

                resolve();
              });
            }

            const iterator = getResponse();
            (function loop() {

              const next = iterator.next();
              if (next.done) {
                email.newpost(subsArr.join(','), post._id)
                .then(() => {}).catch(() => {});
                res.json({ type: 0 });

                return;
              }

              next.value.then(loop);
            })();

          } else {
            res.json({ type: 0 });
          }
        }).catch(() => {
          res.json({ type: 2 });
        });
      } else {
        res.json({ type: 2 });
      }
    }).catch(() => {
      res.json({ type: 2 });
    });
  } else {
    res.json({ type: 2 });
  }
});

export default router;
