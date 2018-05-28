import { Router } from 'express';

import User from 'Root/models/User';

import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';
import god from 'Root/middlewares/permissions/god';
import sendEmail from 'Root/utils/email';

const router = new Router();


router.post(
  '/panel/god/demote',
  logged,
  god,
  requirements(['username']),
  async (req, res) => {

  req.body.username = req.body.username.toLowerCase();

  const user = await User.findOne({
    username: req.body.username,
    type: { $in: [3, 4] }
  });

  if (!user) {
    return res.json({ type: 2, text: 0 });
  }

  if (user.type === 4) {
    return res.json({ type: 2, text: 2 });
  }

  user.type = 2;

  try {
    await user.save();

    sendEmail({
      to: user.email,
      subject: 'عزل مقام شدن - جامعه متن باز قم',
      html: `
        کاربر گرامی ${user.name},
        <br>
        متاسفانه به دلایلی،‌ مدیران حساب شما را از مقام مدیریت
        به مقام کاربر معمولی عزل نمودند
        <br>
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
