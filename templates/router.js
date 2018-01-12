import { Router } from 'express';

const perms = rootRequire('./perms');

const router = new Router();

router.get(
  '/@@replacement@@',
  (req, res) => {
  }
);

export default router;
