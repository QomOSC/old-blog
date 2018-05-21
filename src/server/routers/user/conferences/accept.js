import { Router } from 'express';

import Newsletter from 'Root/models/Newsletter';
import Conference from 'Root/models/Conference';

import sendEmail from 'Root/utils/email';
import { admin } from 'Root/perms';
import { url } from 'Root/config';

const router = new Router();


router.post('/panel/conferences/accept', admin, async (req, res) => {
  if (
    !req.body.description ||
    !req.body.start ||
    !req.body.title ||
    !req.body.end ||
    !req.body._id
  ) {
    res.json({ type: 4 });

    return;
  }

  try {
    const conf = await Conference.findOne({ _id: req.body._id, type: 1 });

    conf.description = req.body.description;
    conf.start = req.body.start;
    conf.title = req.body.title;
    conf.end = req.body.end;
    conf.type = 2;

    await conf.save();

    let emails = '';

    const members = await Newsletter.find({ verified: true });

    for (const i of members) {
      emails += `${i.email},`;
    }

    sendEmail({
      to: emails,
      subject: 'مقاله جدید - جامعه متن باز قم',
      html: `
        کنفرانس جدیدی در جامعه متن باز قم - درباره ${conf.title}
        <br>
        <a href="${url}/conferences/${conf._id}">خواندن مقاله</a>
        <br>
        <a href="${url}/unsubscribe">خروج از خبرنامه</a>
      `
    });

    res.json({ type: 0 });
  }
  catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
