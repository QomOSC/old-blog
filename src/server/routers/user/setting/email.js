import { Router } from 'express';

import Newsletter from 'Root/models/Newsletter';
import User from 'Root/models/User';

import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';
import { email } from 'Root/utils/validator';
import sendEmail from 'Root/utils/email';

const router = new Router();


router.post(
  '/panel/user/setting/email',
  logged,
  requirements(['email']),
  async (req, res) => {

  req.body.email = req.body.email.toLowerCase();

  const user = await User.findById(req.session.user);

  if (!email(req.body.email)) {
    return res.json({ type: 2, text: 3 });
  }

  const checkEmail = await User.findOne({ email: req.body.email });

  if (checkEmail) {
    return res.json({ type: 2, text: 1 });
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
