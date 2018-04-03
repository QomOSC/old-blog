import { Router } from 'express';
import multer from 'multer';

import Article from 'Root/models/Article';

import storage from 'Root/utils/storage';

import config from 'Root/config';
import { logged } from 'Root/perms';

const upload = multer({ dest: config.uploadDir, limits: 3000000, storage });

const router = new Router();

router.post(
  '/panel/user/articles/add',
  logged,
  upload.single('avatar'),
  async (req, res) => {

    console.log(req.body);
    console.log(req.file);

  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    author: req.session.user,
    avatar: req.file.filename
  });

  try {
    await article.save();
    res.json({ type: 0 });
  } catch (e) {
    console.log(e);
    res.json({ type: 2 });
  }
});

export default router;
