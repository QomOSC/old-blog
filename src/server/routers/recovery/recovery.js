import { Router } from 'express';

import Recovery from 'Root/models/Recovery';
import User from 'Root/models/User';

import requirements from 'Root/middlewares/requirements';
import login from 'Root/middlewares/permissions/login';
import sendEmail from 'Root/utils/email';
import random from 'Root/utils/random';
import { url } from 'Root/config';

const router = new Router();


router.post(
  '/recovery',
  login,
  requirements(['email']),
  async (req, res) => {

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.json({ type: 2, text: 0 });
  }

  let rec = await Recovery.findOne({ user: user._id });

  if (rec) {
    sendEmail({
      to: user.email,
      subject: 'بازیابی رمز عبور',
      html: `
        برای بازیابی رمز عبور روی لینک زیر کلیک کنید
        <br>
        <a href='${url}/unsubscribe/${rec.code}'>بازیابی رمز عبور</a>
      `
    });

    res.json({ type: 0 });

    return;
  }

  const code = await random(25);

  rec = new Recovery({
    user: user._id,
    code
  });

  try {
    await rec.save();

    sendEmail({
      to: user.email,
      subject: 'بازیابی رمز عبور',
      html: `
        برای بازیابی رمز عبور روی لینک زیر کلیک کنید
        <br>
        <a href='${url}/unsubscribe/${rec.code}'>بازیابی رمز عبور</a>
      `
    });

    res.json({ type: 0 });
  }

  catch (e) {
    res.json({ type: 2, text: 1 });
  }
});

export default router;
