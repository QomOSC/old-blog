import { Router } from 'express';

const { Article, Member } = rootRequire('./models');
const { logged, u } = rootRequire('./perms');
const { moment, shorten } = rootRequire('./utils');

const router = new Router();

router.get('/u/article/manage', logged, u.admin, async(req, res) => {
  let articles = await Article.find({ type: 1 }).lean();

  for (const i of articles.keys()) {
    delete articles[i].embeds;
    delete articles[i].type;
    delete articles[i].viewers;
    delete articles[i].likes;
    delete articles[i].minutes;
    delete articles[i].__v;

    articles[i].content = shorten(articles[i].content);
    articles[i].createdAt = moment(articles[i].createdAt);

    const author = await Member.findOne({ _id: articles[i].author });

    const authorInfo = {
      fname: author.fname,
      lname: author.lname,
      username: author.username,
      avatar: author.avatar
    };

    articles[i].author = authorInfo;
  }

  res.render('u/article/manage/manage.njk', {
    articles
  });
});

export default router;
