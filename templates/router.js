import { Router } from 'express';
import { perm } from '../perms';

const router = new Router();

router.get('/@@replacement@@', perm, (req, res) => {
});

export default router;
