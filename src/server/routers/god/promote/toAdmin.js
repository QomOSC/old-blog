import { Router } from 'express';

import User from 'Root/models/User';

import sendEmail from 'Root/utils/email';
import { god } from 'Root/perms';

const router = new Router();


router.post('/panel/god/promote/toadmin', god, async (req, res) => {
  if (!req.body.username) {
    res.json({ type: 4 });

    return;
  }
  
  req.body.username = req.body.username.toLowerCase();

  const user = await User.findOne({ username: req.body.username, type: 2 });

  if (!user) {
    res.json({ type: 2, text: 0 });
    return;
  }


  try {
    user.type = 3;

    await user.save();

    sendEmail({
      to: user.email,
      subject: 'ترفیع گرفتن - جامعه متن باز قم',
      html: `
        کاربر گرامی ${user.name},
        <br>
        تبریک! حساب شما به نوع مدیر تغییر کرد<br>
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
