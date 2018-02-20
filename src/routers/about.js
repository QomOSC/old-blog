import { Router } from 'express';

const router = new Router();

router.get('/about-us', (req, res) => {
  res.redirect('/about');
});

router.get('/about', (req, res) => {
  res.render('about.njk');
});

export default router;
