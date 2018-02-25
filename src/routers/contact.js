import { Router } from 'express';

const { Opinion, Member } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/contact-us', (req, res) => {
  res.redirect('/contact');
});

router.get('/contact', async(req, res) => {
  const lastTenOpinions = await Opinion
  .find({ type: 2 })
  .sort({ createdAt: -1 })
  .limit(10);

  const opinions = [];


  for (const i of lastTenOpinions) {
    const oneOP = {
      name: i.name,
      email: i.email,
      title: i.title,
      answer: i.answer,
      description: i.description,
      createdAt: moment(i.createdAt),
      admin: {}
    };

    if (i.admin) {
      const admin = await Member.findOne({ _id: i.admin });
      oneOP.admin.username = admin.username;
      oneOP.admin.fname = admin.fname;
      oneOP.admin.avatar = admin.avatar;
    }

    opinions.push(oneOP);
  }
  res.render('contact.njk', {
    opinions
  });
});

router.post('/contact', (req, res) => {
  if (req.body.email &&
      req.body.name &&
      req.body.title &&
      req.body.captcha &&
      req.body.description) {

    if (req.body.captcha.toLowerCase() === req.session.captcha) {
      const opinion = new Opinion({
        name: req.body.name,
        title: req.body.title,
        email: req.body.email,
        description: req.body.description
      });

      opinion.save().then(() => {
        req.session.captcha = null;
        res.json({ type: 0 });
      }).catch(() => {
        // Error
        res.json({ type: 2, text: 0 });
      });
    } else {
      // Wrong Captcha
      res.json({ type: 2, text: 1 });
    }
  } else {
    // Error
    res.json({ type: 2, text: 0 });
  }
});

export default router;
