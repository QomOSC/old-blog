import { Router } from 'express';

import User from 'Root/models/User';

import sendEmail from 'Root/utils/email';
import { god } from 'Root/perms';

const router = new Router();

router.post('/panel/god/promote/togod', god, async (req, res) => {
  req.body.username = req.body.username.toLowerCase();

  const user = await User.findOne({
    username: req.body.username,
    type: { $in: [2, 3] }
  });

  if (!user) {
    res.json({ type: 2, text: 0 });
    return;
  }

  user.type = 4;

  try {
    await user.save();

    sendEmail({
      to: user.email,
      subject: 'ترفیع گرفتن - جامعه متن باز قم',
      html: `
        کاربر گرامی ${user.name},
        <br>
        تبریک! حساب شما به نوع مدیر کل تغیید کرد<br>
        جامعه متن باز قم
      `
    });

    res.json({ type: 0 });
  }

  catch (e) {
    res.json({ type: 2, text: 1 });
  }
});

export default router;
