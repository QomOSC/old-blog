import { Router } from 'express';

import Comment from 'Root/models/Comment';

import requirements from 'Root/middlewares/requirements';
import { email } from 'Root/utils/validator';

const router = new Router();


router.post(
  '/contact',
  requirements(['description', 'email', 'name']),
  async (req, res) => {

  req.body.email = req.body.email.toLowerCase();

  if (!email(req.body.email)) {
    return res.json({ type: 2 });
  }

  const comment = new Comment({
    description: req.body.description,
    email: req.body.email,
    name: req.body.name,
    contact: true,
  });

  try {
    await comment.save();

    res.json({ type: 0 });
  }
  catch (e) {
    res.json({ type: 2 });
  }
});


export default router;
