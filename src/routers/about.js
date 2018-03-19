import { Router } from 'express';

const router = new Router();

router.get('/about*', (req, res) => {
  res.render('about.njk');
});

export default router;
