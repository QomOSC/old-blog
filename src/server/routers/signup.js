import { Router } from 'express';

import ActivationLink from 'Root/models/ActivationLink';
import User from 'Root/models/User';

import requirements from 'Root/middlewares/requirements';
import login from 'Root/middlewares/permissions/login';
import { hmac } from 'Root/utils/crypto';
import { dbkey, url } from 'Root/config';
import sendEmail from 'Root/utils/email';
import random from 'Root/utils/random';

const router = new Router();


router.post(
  '/signup',
  login,
  requirements(['username', 'password', 'email', 'name']),
  async (req, res) => {

  req.body.username = req.body.username.toLowerCase();
  req.body.email = req.body.email.toLowerCase();

  const email = await User.findOne({ email: req.body.email });

  if (email) {
    return res.json({ type: 2, text: 1 });
  }

  const username = await User.findOne({ username: req.body.username });

  if (username) {
    return res.json({ type: 2, text: 2 });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: hmac(req.body.password, dbkey),
  });

  const code = await random(25);

  const AL = new ActivationLink({
    user: user._id,
    code
  });

  try {
    await user.save();
    await AL.save();

    sendEmail({
      to: user.email,
      subject: 'تایید حساب',
      html: `
        ثبت نام شما در جامعه متن باز قم با موفقیت انجام شد
        <br>
        لطفا تا زمان تایید حساب شما توسط مدیران شکیبا باشید
        <br>
        برای تایید حساب خود روی لینک زیر کلیک کنید
        <br>
        <a href='${url}/activate/${code}'>تایید حساب</a>
        <br>
        شما میتوانید در خبرنامه ثبت نام کنید و از اخبار جدید با خبر شوید
        <br>
        جامعه متن باز قم
      `
    });

    res.json({ type: 0 });

  } catch (e) {
    console.log(e);
    res.json({ type: 2, text: 3 });
  }
});

export default router;
