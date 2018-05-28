import { Router } from 'express';

import Comment from 'Root/models/Comment';

import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';
import admin from 'Root/middlewares/permissions/admin';
import sendEmail from 'Root/utils/email';
import { url } from 'Root/config';

const router = new Router();


router.post(
  '/contact/accept',
  logged,
  admin,
  requirements(['answer', '_id']),
  async (req, res) => {

  try {
    const comment = await Comment.findOne({ _id: req.body._id, type: 1 });

    if (!comment) {
      return res.json({ type: 2 });
    }

    comment.admin = req.session.user;
    comment.type = 2;

    if (req.body.answer) {
      comment.answer = req.body.answer;
    }

    await comment.save();

    sendEmail({
      to: comment.email,
      subject: 'نظر شما به ثبت رسید',
      html: `
        نظر شما با موفقیت در جامعه متن باز قم به ثبت رسید
        <br>
        برای دیدن جواب آن، روی لینک زیر کلیک کنید
        <br>
        <a href='${url}/contact'>مشاهده نظرات</a>
        <br>
        جامعه متن باز قم
      `
    });

    res.json({ type: 0 });
  }
  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
