import crypto from 'crypto';
import multer from 'multer';

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

export default storage;
