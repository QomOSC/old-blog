import { Router } from 'express';

import Newsletter from 'Root/models/Newsletter';
import Article from 'Root/models/Article';

import requirements from 'Root/middlewares/requirements';
import logged from 'Root/middlewares/permissions/logged';
import admin from 'Root/middlewares/permissions/admin';
import sendEmail from 'Root/utils/email';
import { url } from 'Root/config';

const router = new Router();


router.post(
  '/panel/articles/accept',
  logged,
  admin,
  requirements(['content', 'minutes', 'title', '_id']),
  async (req, res) => {

  try {
    const article = await Article.findById(req.body._id);

    if (!article) {
      return res.json({ type: 2, text: 0 });
    }

    article.content = req.body.content;
    article.minutes = req.body.minutes;
    article.title = req.body.title;
    article.type = 2;

    await article.save();

    let emails = '';

    const members = await Newsletter.find({ verified: true });

    for (const i of members) {
      emails += `${i.email},`;
    }

    sendEmail({
      to: emails,
      subject: 'مقاله جدید - جامعه متن باز قم',
      html: `
        مقاله جدید درمورد ${article.title}،
        <br>
        <a href="${url}/articles/${article._id}">خواندن مقاله</a>
        <br>
        <a href="${url}/unsubscribe">خروج از خبرنامه</a>
      `
    });

    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 0 });
  }
});

export default router;
