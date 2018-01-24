// Unfinished work
import { Router } from 'express';
import multer from 'multer';
import crypto from 'crypto';

const { logged } = rootRequire('./perms');
const { Member } = rootRequire('./models');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      const extension = file.mimetype.split('/')[1];

      if (extension === 'jpg' || extension === 'png') {
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
const router = new Router();

router.post(
  '/u/setting/avatar',
  logged,
  upload.single('croppedImage'),
  (req, res) => {

  Member.findOne({ _id: req.member.user._id }).then(member => {
    if (member) {
      member.avatar = req.file.filename;

      member.save().then(() => {
        res.json({ type: 0 });
      }).catch(() => {
        // Error
        res.json({ type: 2 });
      });
    } else {
      // User not Found
      res.json({ type: 2 });
    }
  }).catch(() => {
    // Error
    res.json({ type: 2 });
  });
});

export default router;
