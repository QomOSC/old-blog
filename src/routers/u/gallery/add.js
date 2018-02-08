import { Router } from 'express';

const { logged } = rootRequire('./perms');
const { Gallery } = rootRequire('./models');

const router = new Router();

router.get('/u/gallery/add', logged, (req, res) => {
  res.render('u/gallery/add.njk');
});

export default router;
