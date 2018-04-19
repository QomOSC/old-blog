import { Router } from 'express';

import ActivationLink from 'Root/models/ActivationLink';
import User from 'Root/models/User';

import sendEmail from 'Root/utils/email';

import { hmac } from 'Root/utils/crypto';
import { dbkey, url } from 'Root/config';
import random from 'Root/utils/random';
import { login } from 'Root/perms';

const router = new Router();


router.post('/login', login, async (req, res) => {
  req.body.email = req.body.email.toLowerCase();

  const user = await User
    .findOne({
      email: req.body.email,
      password: hmac(req.body.password, dbkey)
    })
    .select('_id name type email avatar username description');

  if (!user) {
    res.json({ type: 2, text: 0 });
    return;
  }

  if (user.type === 1) {
    // Account is deactive
    res.json({ type: 2, text: 1 });
    return;
  }

  if (!user.verified) {
    // Account has not been verified
    res.json({ type: 2, text: 2 });

    const AL = await ActivationLink.findOne({ user: user._id });

    if (AL) {
      sendEmail({
        to: user.email,
        subject: 'تایید حساب کاربری',
        html: `
          برای تایید حساب کاربری خود روی لینک زیر کلیک کنید
          <br>
          <a href='${url}/activate/${AL.code}'>تایید حساب</a>
        `
      });
    } else {
      const code = await random(25);

      const AL = new ActivationLink({
        user: user._id,
        code
      });

      await AL.save();

      sendEmail({
        to: user.email,
        subject: 'تایید حساب کاربری',
        html: `
          برای تایید حساب کاربری خود روی لینک زیر کلیک کنید
          <br>
          <a href='${url}/activate/${AL.code}'>تایید حساب</a>
        `
      });      
    }

    return;
  }

  req.session.user = user._id.toString();

  res.json({ type: 0, user });
});

export default router;
