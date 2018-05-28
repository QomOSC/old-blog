import { Router } from 'express';
import multer from 'multer';

import Conference from 'Root/models/Conference';

import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';
import admin from 'Root/middlewares/permissions/admin';
import storage from 'Root/utils/storage';
import config from 'Root/config';

const upload = multer({ dest: config.uploadDir, limits: 3000000, storage });

const router = new Router();


router.post(
  '/panel/conferences/gallery',
  logged,
  admin,
  requirements(['_id']),
  upload.single('avatar'),
  async (req, res) => {

  if (!req.file) {
    return res.json({ type: 4 });
  }

  try {
    const conf = await Conference.findById(req.body._id);

    if (!conf) {
      return res.json({ type: 2 });
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
