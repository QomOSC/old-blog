import { Router } from 'express';

import Newsletter from 'Root/models/Newsletter';
import User from 'Root/models/User';

import { email } from 'Root/utils/validator';
import sendEmail from 'Root/utils/email';
import { logged } from 'Root/perms';

const router = new Router();


router.post('/panel/user/setting/email', logged, async (req, res) => {
  req.body.email = req.body.email.toLowerCase();

  const user = await User.findById(req.session.user);

  if (!email(req.body.email)) {
    res.json({ type: 2, text: 3 });

    return;
  }

  const checkEmail = await User.findOne({ email: req.body.email });

  if (checkEmail) {
    res.json({ type: 2, text: 1 });

    return;
  }

  const newsletter = await Newsletter.findOne({ email: user.email });

  try {
    user.email = req.body.email;
    user.verified = false;

    if (newsletter) {
      newsletter.email = req.body.email;
    }
    
    await newsletter.save();
    await user.save();

    sendEmail({
      to: req.body.email,
      subject: 'تغییر ایمیل',
      html: `
        کاربر گرامی ${user.name},
        <br>
        ایمیل شما تغییر کرد،
        <br>
        جامعه متن باز قم
      `
    });

    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 2 });
  }
});

export default router;
