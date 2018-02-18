import { Router } from 'express';

const { Article } = rootRequire('./models');
const { logged } = rootRequire('./perms');

const router = new Router();

router.get('/u/article/:id/edit', logged, async(req, res) => {

  const article = await Article.findOne({ _id: req.params.id });

  if (article && article.author.toString() ===
  req.member.user._id.toString()) {

    res.render('u/article/edit.njk', {
      article,
      member: req.member.user
    });
  } else {
    res.reply.notFound();
  }
});

router.post(
  '/u/article/edit',
  logged,
  async(req, res) => {

  if (req.body.title && req.body.content && req.body.minutes && req.body.id) {

    const article = await Article.findOne({
      _id: req.body.id,
      author: req.member.user._id.toString()
    });

    if (article) {
      article.title = req.body.title;
      article.content = req.body.content;
      article.minutes = req.body.minutes;

      article.save().then(() => {
        res.json({ type: 0 });
      }).catch(() => {
        // Error
        res.json({ type: 2, text: 0 });
      });
    }
  } else {
    // Error
    res.json({ type: 2, text: 0 });
  }
});

export default router;
