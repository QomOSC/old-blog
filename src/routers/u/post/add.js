import { Router } from 'express';
import multer from 'multer';
import crypto from 'crypto';

const { Post, Member, Newsletter } = rootRequire('./models');
const { logged } = rootRequire('./perms');
const { email } = rootRequire('./utils');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      const extension = file.mimetype.split('/')[1];

      if (extension === 'jpeg' || extension === 'png') {
        cb(null, raw.toString('hex') +
        Date.now() +
        '.' +
        extension);
      } else {
        cb(new Error('not an image'));
      }
    });
  }
});

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

    post.save().then(() => {

      Member.findOne({ _id: req.member.user._id }).then(member => {
        if (member) {
          member.posts.push(post._id);

          member.save().then(() => {
            Newsletter.find().then(subscribers => {

              if (JSON.stringify(subscribers) !== '[]') {

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
                    console.log(post);
                    email.newpost(subsArr.join(','), post._id).then(() => {
                      res.json({ type: 0 });
                    }).catch(() => {
                      res.json({ type: 2 });
                    });

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
          }).catch(() => {
            res.json({ type: 2 });
          });
        } else {
          res.json({ type: 2 });
        }
      }).catch(() => {
        res.json({ type: 2 });
      });
    }).catch(() => {
      res.json({ type: 2 });
    });
  } else {
    res.json({ type: 2 });
  }
});

export default router;
