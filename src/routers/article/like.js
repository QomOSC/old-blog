import { Router } from 'express';

const { Article } = rootRequire('./models');

const router = new Router();

router.post('/article/like/:id', async(req, res) => {
  if (req.member.user) {

    const article = await Article.findOne({ _id: req.params.id });

    if (article) {

      if (article.likes.indexOf(req.member.user._id) === -1) {
        article.likes.push(req.member.user._id);

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
    // Not Logged in
    res.json({ type: 2, text: 1 });
  }
});

export default router;
