import { Router } from 'express';

import Newsletter from 'Root/models/Newsletter';
import Article from 'Root/models/Article';

import sendEmail from 'Root/utils/email';
import { admin } from 'Root/perms';
import { url } from 'Root/config';

const router = new Router();

router.post('/panel/articles/accept', admin, async (req, res) => {
  try {
    const article = await Article.findById(req.body._id);

    if (!article) {
      res.json({ type: 2, text: 0 });
      return;
    }

    article.type = 2;
    article.title = req.body.title;
    article.content = req.body.content;
    article.minutes = req.body.minutes;

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
