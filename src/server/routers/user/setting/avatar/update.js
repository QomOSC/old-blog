import { Router } from 'express';
import multer from 'multer';

import User from 'Root/models/User';

import logged from 'Root/middlewares/permissions/logged';
import storage from 'Root/utils/storage';
import config from 'Root/config';

const upload = multer({ dest: config.uploadDir, limits: 3000000, storage });

const router = new Router();


router.post(
  '/panel/user/setting/avatar/update',
  logged,
  upload.single('avatar'),
  async (req, res) => {

  if (!req.file) {
    return res.json({ type: 4 });
  }

  const user = await User.findById(req.session.user);

  try {
    user.avatar = req.file.filename;

    await user.save();

    res.json({ type: 0, avatar: req.file.filename });
  } catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
