import { Router } from 'express';

const router = new Router();

router.get('/contact', (req, res) => {
  res.render('contact.njk');
});

export default router;
