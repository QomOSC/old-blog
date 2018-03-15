import { Router } from 'express';

const { Member, Article } = rootRequire('./models');
const { moment, shorten } = rootRequire('./utils');

const router = new Router();

router.get('/user/:username', async(req, res) => {
  req.params.username = req.params.username.toLowerCase();

  const member = await Member.findOne({ username: req.params.username }).lean();

  if (!member) {
    res.reply.notFound();
    return;
  }
  
  member.articles = member.articles.length;
  member.createdAt = moment(member.createdAt);

  const articles = await Article
    .find({ author: member._id, type: 2 })
    .limit(12)
    .sort({ createdAt: -1 })
    .lean();


  for (const i of articles.keys()) {
    articles[i].content = shorten(articles[i].content);
    articles[i].viewers = articles[i].viewers.length;
    articles[i].likes = articles[i].likes.length;
  }

  res.render('user.njk', {
    articles,
    member
  });
});

export default router;
