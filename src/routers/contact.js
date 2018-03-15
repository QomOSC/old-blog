import { Router } from 'express';

const { Comment, Member } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/contact-us', (req, res) => {
  res.redirect('/contact');
});

router.get('/contact', async(req, res) => {
  const comments = await Comment
  .find({ type: 2 })
  .sort({ createdAt: -1 })
  .limit(10)
  .lean();

  console.log(comments);

  for (const i of comments.keys()) {
    comments[i].createdAt = moment(comments[i].createdAt);

    if (i.admin) {
      comments[i].admin = await Member.findOne({ _id: comments[i].admin });
    }

    const commenter = await Member.findOne({ email: i.email });

    if (commenter && commenter.avatar) {
      comments[i].avatar = commenter.avatar;
    }
  }

  res.render('contact.njk', {
    comments
  });
});

router.post('/contact', async(req, res) => {
  if (!req.body.email ||
      !req.body.name ||
      !req.body.title ||
      !req.body.captcha ||
      !req.body.description) {

    // Error
    res.json({ type: 2, text: 0 });
    return;
  }

  if (req.body.captcha.toLowerCase() !== req.session.captcha) {
    // Wrong Captcha
    res.json({ type: 2, text: 1 });
    return;
  }

  const comment = new Comment({
    name: req.body.name,
    email: req.body.email,
    title: req.body.title,
    description: req.body.description
  });

  try {
    await comment.save();
    req.session.captcha = null;
    res.json({ type: 0 });
  } catch (e) {
    // Error
    res.json({ type: 2, text: 0 });
  }
});

export default router;
