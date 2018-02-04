import { Router } from 'express';
import multer from 'multer';
import crypto from 'crypto';

const { logged } = rootRequire('./perms');

const router = new Router();

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


router.post(
  '/u/post/addonephoto',
  logged,
  upload.single('postPhoto'),
  (req, res) => {
    res.json(req.file);
});

export default router;
