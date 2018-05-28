import { Router } from 'express';

import Newsletter from 'Root/models/Newsletter';
import User from 'Root/models/User';

import removeConferences from 'Root/utils/remove/removeConferences';
import removeArticles from 'Root/utils/remove/removeArticles';
import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';
import god from 'Root/middlewares/permissions/god';
import removeImage from 'Root/utils/removeImage';
import sendEmail from 'Root/utils/email';

const router = new Router();


router.post(
  '/panel/god/remove',
  logged,
  god,
  requirements(['username']),
  async (req, res) => {

  req.body.username = req.body.username.toLowerCase();

  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.json({ type: 2, text: 0 });
  }

  if (user._id.toString() === req.session.user) {
    return res.json({ type: 2, text: 2 });
  }

  if (user.type === 4) {
    return res.json({ type: 2, text: 1 });
  }


  const newsletter = await Newsletter.findOne({ email: user.email });

  try {
    if (user.avatar) {
      await removeImage(user.avatar);
    }

    await removeArticles(user._id.toString());
    await removeConferences(user._id.toString());


    await newsletter.remove();
    await user.remove();

    sendEmail({
      to: user.email,
      subject: 'حذف فوری حساب',
      html: `
        متاسفانه حساب شما توسط مدیران به صورت فوری حذف شد
        <br>
        جامعه متن باز قم
      `
    });

    res.json({ type: 0 });
  }

  catch (e) {
    res.json({ type: 2, text: 3 });
  }
});

export default router;
