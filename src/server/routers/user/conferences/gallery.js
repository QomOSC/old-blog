import { Router } from 'express';
import multer from 'multer';

import Conference from 'Root/models/Conference';

import storage from 'Root/utils/storage';
import { admin } from 'Root/perms';
import config from 'Root/config';

const upload = multer({ dest: config.uploadDir, limits: 3000000, storage });

const router = new Router();

router.post(
  '/panel/conferences/gallery',
  admin,
  upload.single('avatar'),
  async (req, res) => {

  try {
    const conf = await Conference.findById(req.body._id);

    if (!conf) {
      res.json({ type: 2 });
      return;
    }

    conf.galleries.push(req.file.filename);

    await conf.save();

    res.json({ type: 0 });
  }

  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
