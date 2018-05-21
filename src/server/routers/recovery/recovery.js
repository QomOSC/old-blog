import { Router } from 'express';

import Recovery from 'Root/models/Recovery';
import User from 'Root/models/User';

import sendEmail from 'Root/utils/email';
import random from 'Root/utils/random';
import { login } from 'Root/perms';
import { url } from 'Root/config';

const router = new Router();


router.post('/recovery', login, async (req, res) => {
  if (!req.body.email) {
    res.json({ type: 4 });

    return;
  }
  
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.json({ type: 2, text: 0 });

    return;
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
