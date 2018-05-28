import { Router } from 'express';

import Newsletter from 'Root/models/Newsletter';

import requirements from 'Root/middlewares/requirements';
import sendEmail from 'Root/utils/email';

import { url } from 'Root/config';

const router = new Router();


router.post(
  '/unsubscribe',
  requirements(['email']),
  async (req, res) => {

  req.body.email = req.body.email.toLowerCase();

  let newsletter = await Newsletter.findOne({ email: req.body.email });

  if (!newsletter) {
    return res.json({ type: 2, text: 0 });
  }

  try {
    sendEmail({
      to: req.body.email,
      subject: 'خروج از خبرنامه',
      html: `
        برای خروج از خبرنامه روز لینک زیر کلیک کنید
        <br>
        <a href='${url}/unsubscribe/${newsletter._id}'>خروج از خبرنامه</a>
      `
    });

    res.json({ type: 0 });
  }

  catch (e) {
    res.json({ type: 2, text: 1 });
  }
});

export default router;
