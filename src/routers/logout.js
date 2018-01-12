import { Router } from 'express';

const router = new Router();

router.get('/u/logout', (req, res) => {
  req.member.logout();

  res.redirect('/');
});

export default router;
