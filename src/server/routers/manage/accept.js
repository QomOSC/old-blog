import { Router } from 'express';

import User from 'Root/models/User';

import sendEmail from 'Root/utils/email';

import { url } from 'Root/config';
import { admin } from 'Root/perms';

const router = new Router();

router.post('/panel/manage/accept', admin, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body._id, type: 1 });

    if (!user) {
      res.json({ type: 2 });
      return;
    }

    user.type = 2;

    await user.save();

    sendEmail({
      to: user.email,
      subject: 'تایید حساب در جامعه متن باز قم',
      html: `
        کاربر عزیز ${user.name},
        <br>
        حساب شما با موفقیت ار طرف مدیران پذیرفته شد
        <br>
        <a href='${url}/login'>وارد شوید</a>
      `
    });

    res.json({ type: 0 });
  }
  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
