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

  if (!member) {
    res.json({ type: 2 });
    return;
  }

  member.articles.splice(req.params.id, 1);

  await member.save();

  await Tag.remove({ article: article._id });

  const regex = /(?:!\[.*]\()([\w\/.]+)(?:\))/gi, subst = '$1';

  let photos = article.content
  .match(regex, subst);

  if (photos) {
    photos = photos
    .map(x => x.replace(regex, subst))
    .map(x => x.split('/')[2]);

    for (const i of photos) {
      await removeImage(i);
    }
  }

  if (article.avatar) {
    await removeImage(article.avatar);
  }

  try {
    await article.remove();
    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
