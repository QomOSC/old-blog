import multer from 'multer';

import random from './random';
import config from 'Root/config';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, config.uploadDir);
  },
  async filename(req, file, cb) {
    const r = await random(16);
    const extension = file.mimetype.split('/')[1];

    if (extension === 'jpeg' || extension === 'png') {
      cb(null, r + Date.now() + '.' + extension);

      return;
    }

    cb(new Error('not an image'));
  }
});

export default storage;
