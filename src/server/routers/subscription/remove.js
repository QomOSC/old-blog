import { Router } from 'express';

import Newsletter from 'Root/models/Newsletter';

const router = new Router();


router.post('/unsubscribe/remove', async (req, res) => {
  try {
    let newsletter = await Newsletter.findById(req.body._id);

    if (!newsletter) {
      res.json({ type: 2 });

      return;
    }

    await newsletter.remove();

    res.json({ type: 0 });
  }

  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
