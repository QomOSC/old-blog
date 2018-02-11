import { Router } from 'express';
import multer from 'multer';

const { logged } = rootRequire('./perms');
const { storage } = rootRequire('./utils');

const router = new Router();

const upload = multer({ dest: 'uploads/', limits: 3000000, storage });


router.post(
  '/u/post/addonephoto',
  logged,
  upload.single('postPhoto'),
  (req, res) => {
    res.json({ filename: req.file.filename });
});

export default router;
