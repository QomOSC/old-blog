import { Router } from 'express';

const { logged } = rootRequire('./perms');

const router = new Router();

router.get('/u', logged, (req, res) => {
  res.render('u.njk', {
    member: req.member.user
  });
});

export default router;
