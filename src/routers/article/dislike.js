import { Router } from 'express';

const { Article } = rootRequire('./models');

const router = new Router();

router.post('/article/dislike/:id', async(req, res) => {
  if (req.member.user) {

    const article = await Article.findOne({ _id: req.params.id });

    if (article) {

      if (article.likes.indexOf(req.member.user._id) !== -1) {

        article.likes.splice(req.member.user._id, 1);

        article.save().then(() => {
          res.json({ type: 0, text: 0 });
        }).catch(() => {
          res.json({ type: 2, text: 0 });
        });
      } else {
        // Duplicate
        res.json({ type: 0, text: 1 });
      }
    } else {
      res.json({ type: 2, text: 0 });
    }

  } else {
    res.json({ type: 2, text: 1 });
  }
});

export default router;
