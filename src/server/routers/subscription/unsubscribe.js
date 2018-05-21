import { Router } from 'express';

import Newsletter from 'Root/models/Newsletter';

import sendEmail from 'Root/utils/email';

import { url } from 'Root/config';

const router = new Router();


router.post('/unsubscribe', async (req, res) => {
  if (!req.body.email) {
    res.json({ type: 4 });

    return;
  }
  
  req.body.email = req.body.email.toLowerCase();

  let newsletter = await Newsletter.findOne({ email: req.body.email });

  if (!newsletter) {
    res.json({ type: 2, text: 0 });
    return;
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
