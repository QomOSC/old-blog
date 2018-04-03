import { Router } from 'express';

const router = new Router();

router.post('/panel/user/articles/add', (req, res) => {
  console.log('AA');
  res.json({ name: 'Hello' });
});

export default router;
