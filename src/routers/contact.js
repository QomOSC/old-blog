import { Router } from 'express';

const { Comment, Member } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/contact-us', (req, res) => {
  res.redirect('/contact');
});

router.get('/contact', async(req, res) => {
  const lastTenComments = await Comment
  .find({ type: 2 })
  .sort({ createdAt: -1 })
  .limit(10);

  const comments = [];


  for (const i of lastTenComments) {
    const oneCom = {
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
      oneCom.admin.username = admin.username;
      oneCom.admin.fname = admin.fname;
      oneCom.admin.lname = admin.lname;
      oneCom.admin.avatar = admin.avatar;
    }

    const commenter = await Member.findOne({ email: i.email });

    if (commenter && commenter.avatar) {
      oneCom.avatar = commenter.avatar;
    }

    comments.push(oneCom);
  }

  res.render('contact.njk', {
    comments
  });
});

router.post('/contact', (req, res) => {
  if (req.body.email &&
      req.body.name &&
      req.body.title &&
      req.body.captcha &&
      req.body.description) {

    if (req.body.captcha.toLowerCase() === req.session.captcha) {
      const comment = new Comment({
        name: req.body.name,
        email: req.body.email,
        title: req.body.title,
        description: req.body.description
      });

      comment.save().then(() => {
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
