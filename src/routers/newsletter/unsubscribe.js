import { Router } from 'express';

const { Newsletter } = rootRequire('./models');

const router = new Router();

router.get('/unsubscribe', (req, res) => {
  res.render('newsletter/unsubscribe.njk');
});

router.post('/unsubscribe', (req, res) => {
  
});

export default router;
