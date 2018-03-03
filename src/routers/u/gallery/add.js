import { Router } from 'express';
import multer from 'multer';

const { Gallery } = rootRequire('./models');
const { logged } = rootRequire('./perms');
const { storage } = rootRequire('./utils');

const router = new Router();

const upload = multer({ dest: 'uploads/', limits: 3000000, storage });

router.get('/u/gallery/add', logged, (req, res) => {
  res.render('u/gallery/add.njk');
});

router.post(
  '/u/gallery/add',
  logged,
  upload.single('galleryPhoto'),
  async(req, res) => {

  if (!req.body.title || !req.file) {
    // Error
    res.json({ type: 2 });
    return;
  }

  const newGallery = new Gallery({
    title: req.body.title,
    photo: req.file.filename,
    photographer: req.member.user._id
  });

  try {
    await newGallery.save();
    res.send({ type: 0 });
  } catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
