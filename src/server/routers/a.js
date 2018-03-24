import { Router } from 'express';

const router = new Router();

router.get('/a', (req, res) => {
  res.send('Hello');
});

export default router;
