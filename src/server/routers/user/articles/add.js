import { Router } from 'express';
import multer from 'multer';

import Article from 'Root/models/Article';
import User from 'Root/models/User';
import Tag from 'Root/models/Tag';

import logged from 'Root/middlewares/permissions/logged';
import storage from 'Root/utils/storage';
import config from 'Root/config';

const upload = multer({ dest: config.uploadDir, limits: 3000000, storage });

const router = new Router();


router.post(
  '/panel/articles/add',
  logged,
  upload.single('avatar'),
  async (req, res) => {

  if (!req.file) {
    return res.json({ type: 4 });
  }

  let article = new Article({
    content: req.body.content,
    avatar: req.file.filename,
    minutes: req.body.minutes,
    author: req.session.user,
    title: req.body.title,
  });

  try {
    article = await article.save();

    const user = await User.findById(req.session.user);

    user.articles.push(article._id);

    await user.save();


    if (req.body.tags) {
      let tags = req.body.tags.split(',');
      tags = tags.map(v => v.trim());
      tags = [...new Set(tags)];

      for (const i of tags) {
        const newTag = new Tag({
          article: article._id,
          tagname: i
        });

        newTag.save();
      }
    }

    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
