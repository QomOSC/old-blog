import { Router } from 'express';

import User from 'Root/models/User';

import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';
import god from 'Root/middlewares/permissions/god';
import sendEmail from 'Root/utils/email';

const router = new Router();


router.post(
  '/panel/god/promote/togod',
  logged,
  god,
  requirements(['username']),
  async (req, res) => {

  req.body.username = req.body.username.toLowerCase();

  const user = await User.findOne({
    username: req.body.username,
    type: { $in: [2, 3] }
  });

  if (!user) {
    return res.json({ type: 2, text: 0 });
  }


  try {
    user.type = 4;

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
