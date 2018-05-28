import { Router } from 'express';

import Newsletter from 'Root/models/Newsletter';

import requirements from 'Root/middlewares/requirements';
import sendEmail from 'Root/utils/email';
import random from 'Root/utils/random';
import { url } from 'Root/config';

const router = new Router();


router.post(
  '/subscribe',
  requirements(['email']),
  async (req, res) => {

  req.body.email = req.body.email.toLowerCase();

  let newsletter = await Newsletter.findOne({
    email: req.body.email
  });

  if (newsletter && !newsletter.verified) {
    res.json({ type: 2, text: 0 });

    sendEmail({
      to: newsletter.email,
      subject: 'تایید ایمیل - جامعه متن باز',
      html: `
        برای استفاده از خبرنامه باید ایمیل خود را تایید کنید
        <br>
        <a href="${url}/subscribe/verify/${newsletter.token}">تایید ایمیل</a>
        <br>
        جامعه متن باز قم
      `
    });

    return;
  }

  if (newsletter && newsletter.verified) {
    return res.json({ type: 0, text: 0 });
  }

  const token = await random(25);

  newsletter = new Newsletter({
    email: req.body.email,
    token
  });

  try {
    await newsletter.save();

    sendEmail({
      to: newsletter.email,
      subject: 'تایید ایمیل - جامعه متن باز',
      html: `
        برای استفاده از خبرنامه باید ایمیل خود را تایید کنید
        <br>
        <a href="${url}/subscribe/verify/${newsletter.token}">تایید ایمیل</a>
        <br>
        جامعه متن باز قم
      `
    });

    res.json({ type: 0, text: 1 });
  }

  catch (e) {
    res.json({ type: 2, text: 1 });
  }
});

export default router;
