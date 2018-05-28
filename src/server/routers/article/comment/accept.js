import { Router } from 'express';

import Comment from 'Root/models/Comment';

import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';
import sendEmail from 'Root/utils/email';
import { url } from 'Root/config';

const router = new Router();


router.post(
  '/article/comment/accept',
  logged,
  requirements(['answer', '_id']),
  async (req, res) => {

  const comment = await Comment.findOne({
    author: req.session.user,
    _id: req.body._id,
    type: 1
  });

  if (!comment) {
    return res.json({ type: 2 });
  }


  try {
    comment.type = 2;

    if (req.body.answer) {
      comment.answer = req.body.answer;
    }

    await comment.save();

    sendEmail({
      to: comment.email,
      subject: 'نظر شما با موفقیت پذیرفته شد',
      html: `
        نظر شما با موفقیت تایید شد
        <br>
        برای دیدن مقاله به لینک زیر بروید
        <br>
        <a href='${url}/articles/${comment.article}'>مقاله</a>
      `
    });

    res.json({ type: 0 });
  }

  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
