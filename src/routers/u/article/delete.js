import { Router } from 'express';

const { Article, Member, Tag } = rootRequire('./models');
const { logged } = rootRequire('./perms');
const { removeImage } = rootRequire('./utils');

const router = new Router();

router.post('/u/article/delete/:id', logged, async(req, res) => {
  const article = await Article.findOne({
    author: req.member.user._id,
    _id: req.params.id
  });
  const member = await Member.findOne({ _id: req.member.user._id });

  if (member) {
    member.articles.splice(req.params.id, 1);

    member.save().then(async() => {

      await Tag.remove({ article: article._id });

      const regex = /(?:!\[.*]\()([\w\/.]+)(?:\))/gi, subst = '$1';

      const photos = article.content
      .match(regex, subst)
      .map(x => x.replace(regex, subst))
      .map(x => x.split('/')[2]);
      
      for (const i of photos) {
        await removeImage(i);
      }

      if (article.avatar) {
        removeImage(article.avatar)
          .then(() => {
            article.remove().then(() => {
              res.json({ type: 0 });
            }).catch(() => {
              res.json({ type: 2 });
            });
          }).catch(() => {
            res.json({ type: 2 });
          });
      } else {
        article.remove().then(() => {
          res.json({ type: 0 });
        }).catch(() => {
          res.json({ type: 2 });
        });
      }

    }).catch(() => {
      res.json({ type: 2 });
    });
  } else {
    res.json({ type: 2 });
  }
});

export default router;
