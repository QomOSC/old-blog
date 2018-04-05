import { Router } from 'express';

import { email } from 'Root/utils/validator';

const router = new Router();

router.post('/contact', (req, res) => {
  console.log(req.body);


  if (
    !req.body.data.name ||
    !req.body.data.decs ||
    !res.body.data.email
  ) {
    res.json({ type: 2 });
    return;
  }

  if (!email(req.body.data.email)) {
    res.json({ type: 2 });
    return;
  }

  // send data to matinkaboli@aol.com
  res.json({ type: 0 });
});


export default router;
