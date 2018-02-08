import { Router } from 'express';

const { logged } = rootRequire('./perms');
const { Gallery } = rootRequire('./models');

const router = new Router();

router.get('/u/gallery/', logged, (req, res) => {
  Gallery.find({ photographer: req.member.user._id }).then(photos => {
    res.render('u/gallery/mygallery.njk', {
      photos
    });
  });
});

export default router;
