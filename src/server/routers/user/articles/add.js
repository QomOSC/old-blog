import { Router } from 'express';
import multer from 'multer';

import Article from 'Root/models/Article';
import User from 'Root/models/User';

import storage from 'Root/utils/storage';

import config from 'Root/config';
import { logged } from 'Root/perms';

const upload = multer({ dest: config.uploadDir, limits: 3000000, storage });

const router = new Router();

router.post(
  '/panel/articles/add',
  logged,
  upload.single('avatar'),
  async (req, res) => {

  let article = new Article({
    title: req.body.title,
    content: req.body.content,
    author: req.session.user,
    minutes: req.body.minutes,
    avatar: req.file.filename
  });

  try {
    article = await article.save();

    const user = await User.findById(req.session.user);

    if (!user) {
      res.json({ type: 2 });
    }

    user.articles.push(article._id);

    await user.save();

    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
