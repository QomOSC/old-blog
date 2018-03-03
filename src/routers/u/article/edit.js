import { Router } from 'express';

const { Article } = rootRequire('./models');
const { logged } = rootRequire('./perms');

const router = new Router();

router.get('/u/article/:id/edit', logged, async(req, res) => {

  const article = await Article.findOne({ _id: req.params.id });

  if (article && article.author.toString() !==
  req.member.user._id.toString()) {
    res.reply.notFound();
    return;
  }

  res.render('u/article/edit.njk', {
    article
  });
});

router.post(
  '/u/article/edit',
  logged,
  async(req, res) => {

  if (
    !req.body.title ||
    !req.body.content ||
    !req.body.minutes ||
    !req.body.id) {

    res.json({ type: 2, text: 0 });
    return;
  }

  const article = await Article.findOne({
    _id: req.body.id,
    author: req.member.user._id.toString()
  });

  if (!article) {
    res.json({ type: 2, text: 0 });
  }

  article.title = req.body.title;
  article.content = req.body.content;
  article.minutes = req.body.minutes;

  try {
    await article.save();
    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2, text: 0 });
  }
});

export default router;
