import { Router } from 'express';

import Recovery from 'Root/models/Recovery';

const router = new Router();

router.post('/recovery/check', async (req, res) => {
  const rec = await Recovery.findOne({ code: req.body.code });

  if (rec) {
    res.json({ type: 0 });
    return;
  }

  res.json({ type: 2 });
});

export default router;
