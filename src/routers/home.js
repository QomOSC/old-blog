import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
  res.send('This is the main page');
});

export default router;
