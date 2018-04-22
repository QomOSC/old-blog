import { Router } from 'express';

import Conference from 'Root/models/Conference';
import User from 'Root/models/User';

import sendEmail from 'Root/utils/email';
import { logged } from 'Root/perms';

const router = new Router();

router.post('/conference/attend', logged, async (req, res) => {
  try {
    const conf = await Conference.findById(req.body._id);

    if (!conf) {
      res.json({ type: 2, text: 0 });
      return;
    }

    const user = await User.findById(req.session.user);

    if (conf.attenders.includes(req.session.user)) {
      res.json({ type: 0, text: 0 });

      sendEmail({
        to: user.email,
        subject: `شرکت شما در کنفرانس ${conf.title}`,
        html: `
          درود ${user.name},
          <br>
          اعلام حظور در کنفرانس ${conf.title} با موفقیت ثبت شد
          <br>
          جامعه متن باز قم
        `
      });

      return;
    }

    conf.attenders.push(req.session.user);

    await conf.save();

    sendEmail({
      to: user.email,
      subject: `شرکت شما در کنفرانس ${conf.title}`,
      html: `
        درود ${user.name},
        <br>
        اعلام حظور در کنفرانس ${conf.title} با موفقیت ثبت شد
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
