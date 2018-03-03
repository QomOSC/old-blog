import { Router } from 'express';

const { Conference } = rootRequire('./models');

const router = new Router();

router.post('/u/conference/attend/:id', async(req, res) => {
  if (!req.member.logged()) {
    // You are not logged in
    res.json({ type: 2, text: 0 });
    return;
  }

  const conf = await Conference.findOne({ _id: req.params.id });

  if (!conf) {
    // Conference not found
    res.json({ type: 2, text: 1 });
    return;
  }

  if (conf.attender.includes(req.member.user._id.toString())) {
    // You have already joined to the conference
    res.json({ type: 2, text: 2 });
    return;
  }

  conf.attender.push(req.member.user._id.toString());

  try {
    await conf.save();
    res.json({ type: 0 });
  } catch (e) {
    // Error
    res.json({ type: 2, text: 3 });
  }
});

export default router;
