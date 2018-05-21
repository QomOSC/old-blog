import { Router } from 'express';

import Newsletter from 'Root/models/Newsletter';
import User from 'Root/models/User';

import removeConferences from 'Root/utils/remove/removeConferences';
import removeArticles from 'Root/utils/remove/removeArticles';
import logged from 'Root/middlewares/permissions/logged';
import removeImage from 'Root/utils/removeImage';
import sendEmail from 'Root/utils/email';

const router = new Router();


router.post('/panel/user/setting/delete', logged, async (req, res) => {
  try {
    const user = await User.findById(req.session.user);
    const newsletter = await Newsletter.findOne({ email: user.email });

    if (user.avatar) {
      await removeImage(user.avatar);
    }

    await removeArticles(req.session.user);
    await removeConferences(req.session.user);

    await newsletter.remove();
    await user.remove();


    sendEmail({
      to: user.email,
      subject: 'حذف حساب، جامعه متن باز قم',
      html: `
        کاربر گرامی ${user.name},
        <br>
        حساب شما با موفقیت در جامعه متن باز قم حذف شد
      `
    });

    req.session.user = null;

    res.json({ type: 0 });
  }
  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
