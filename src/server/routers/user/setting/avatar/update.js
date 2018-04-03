import { Router } from 'express';
import multer from 'multer';

import User from 'Root/models/User';

import storage from 'Root/utils/storage';

import config from 'Root/config';
import { logged } from 'Root/perms';

const router = new Router();

const upload = multer({ dest: config.uploadDir, limits: 3000000, storage });

router.post(
  '/panel/user/setting/avatar/update',
  logged,
  upload.single('avatar'),
  async (req, res) => {

  console.log(req.body);
  console.log(req.file);

  const user = await User.findById(req.session.user);

  if (!user) {
    res.json({ type: 2 });
    return;
  }

  user.avatar = req.file.filename;

  try {
    await user.save();

    res.json({ type: 0, avatar: req.file.filename });
  } catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
