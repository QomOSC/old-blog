import { Router } from 'express';

const { Article, Member, Tag } = rootRequire('./models');
const { logged, u } = rootRequire('./perms');
const { removeImage } = rootRequire('./utils');

const router = new Router();

router.post(
  '/u/article/manage/:id/accept',
  logged, u.admin,
  async(req, res) => {

  const article = await Article.findOne({ _id: req.params.id, type: 1 });

  if (!article) {
    res.reply.error();
    return;
  }

  const author = await Member.findOne({ _id: article.author });

  author.articles.splice(req.params.id, 1);

  await Tag.remove({ article: article._id });

  const regex = /(?:!\[.*]\()([\w\/.]+)(?:\))/gi, subst = '$1';

  let photos = article.content
  .match(regex, subst);

  try {
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

    await author.save();
    await article.remove();
    res.json({ type: 0 });
  } catch (e) {
    res.json({ type: 2 });
  }
});

export default router;
