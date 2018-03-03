import { Router } from 'express';

const { Gallery } = rootRequire('./models');
const { logged } = rootRequire('./perms');
const { removeImage } = rootRequire('./utils');

const router = new Router();

router.post('/u/gallery/remove/:id', logged, async(req, res) => {
  const photo = await Gallery.findOne({ _id: req.params.id });

  if (photo) {
    try {
      await removeImage(photo.photo);
      await photo.remove();
      res.json({ type: 0 });
    } catch (e) {
      res.json({ type: 2 });
    }
  } else {
    res.json({ type: 2 });
  }
});

export default router;
