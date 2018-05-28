import { Router } from 'express';

import Newsletter from 'Root/models/Newsletter';

import requirements from 'Root/middlewares/requirements';

const router = new Router();


router.post(
  '/unsubscribe/remove',
  requirements(['_id']),
  async (req, res) => {

  try {
    let newsletter = await Newsletter.findById(req.body._id);

    if (!newsletter) {
      return res.json({ type: 2 });
    }

    await newsletter.remove();

    res.json({ type: 0 });
  }

  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
