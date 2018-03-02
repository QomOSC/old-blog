import { Router } from 'express';
import multer from 'multer';

const { Article, Member, Newsletter, Tag } = rootRequire('./models');
const { logged } = rootRequire('./perms');
const { email, storage } = rootRequire('./utils');

const upload = multer({ dest: 'uploads/', limits: 3000000, storage });

const router = new Router();
router.get('/u/article/add', logged, (req, res) => {
  res.render('u/article/add.njk');
});

router.post(
  '/u/article/add',
  logged,
  upload.single('croppedImage'),
  (req, res) => {

  if (req.body.title && req.body.content && req.body.minutes) {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      minutes: req.body.minutes,
      author: req.member.user._id,
      avatar: req.file.filename
    });

    if (req.body.embeds) {
      const embeds = req.body.embeds.split(',');
      article.embeds = embeds;
    }


    article.save().then(async() => {

      if (req.body.tags) {
        let tags = req.body.tags
          .split(',', 5)
          .map(x => x.trim().replace(/\s/g, '_').trim());

        tags = Array.from(new Set(tags));

        for (let i = 0; i < tags.length; i++) {
          if (!tags[i].trim()) {
            tags.splice(i, 1);
          }
        }

        for (const i of tags) {
          const newTag = new Tag({
            article: article._id,
            tagname: i
          });

          newTag.save().then(() => {}).catch(() => {});
        }
      }

      const member = await Member.findOne({ _id: req.member.user._id });

      if (member) {
        member.articles.push(article._id);

        member.save().then(async() => {

          const subscribers = await Newsletter.find();

          if (subscribers.length !== 0) {

            let subsArr = [];

            for (const i of subscribers) {
              subsArr.push(i.email);
            }

            email.newarticle(subsArr.join(','), article._id)
            .then(() => {}).catch(() => {});
            res.json({ type: 0 });

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
