import { Router } from 'express';

const { Article, Member, Tag } = rootRequire('./models');
const { moment, shorten } = rootRequire('./utils');

const router = new Router();

router.get('/tag/:tagname', async(req, res) => {
  const page = parseInt(req.query.page) || 0,
  start = page * 12,
  stop = page * 12 + 12;

  const tags = await Tag
  .find({ tagname: req.params.tagname })
  .select('-__v')
  .sort({ createdAt: -1 })
  .skip(start)
  .limit(stop);

  const tagsInfo = [];

  for (const i of tags) {

    const article = await Article
      .findOne({ _id: i.article, type: 2 })
      .select('-__v -embeds -type -minutes')
      .lean();

    if (!article) {
      return;
    }

    article.createdAt = moment(article.createdAt);
    article.likes = article.likes.length;
    article.viewers = article.viewers.length;
    article.content = shorten(article.content);

    const member = await Member
      .findOne({ _id: article.author })
      .select('-__v -_id -password -submembers -articles -createdAt -type');

    if (!member) {
      res.reply.error();
      return;
    }

    tagsInfo.push({ article, member });
  }

  res.render('tag.njk', {
    tags: tagsInfo,
    tagname: req.params.tagname
  });
});

export default router;
