import { Router } from 'express';
import multer from 'multer';
import crypto from 'crypto';

const { logged } = rootRequire('./perms');
const { Gallery } = rootRequire('./models');

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

router.get('/u/gallery/add', logged, (req, res) => {
  res.render('u/gallery/add.njk');
});

router.post(
  '/u/gallery/add',
  logged,
  upload.single('galleryPhoto'),
  (req, res) => {
    if (req.body.title && req.file) {
      const newGallery = new Gallery({
        title: req.body.title,
        photo: req.file.filename,
        photographer: req.member.user._id
      });

      newGallery.save().then(() => {
        // OK
        res.send({ type: 0 });
      }).catch(() => {
        // Error
        res.json({ type: 2 });
      });
    } else {
      // Error
      res.json({ type: 2 });
    }
});

export default router;
