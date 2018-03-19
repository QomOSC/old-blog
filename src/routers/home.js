import { Router } from 'express';

const { Article, Member, Conference } = rootRequire('./models');
const { moment, shorten } = rootRequire('./utils');

const router = new Router();

router.get('/', async(req, res) => {

  const articles = await Article
    .find({ type: 2 })
    .select('-__v -type -minutes -embeds')
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();

  for (const i of articles.keys()) {
    articles[i].content = shorten(articles[i].content);
    articles[i].viewers = articles[i].viewers.length;
    articles[i].likes = articles[i].likes.length;
    articles[i].createdAt = moment(articles[i].createdAt);

    const member = await Member
      .findOne({ _id: articles[i].author })
      .select('-__v -_id -password -submembers -articles -createdAt -type');

    articles[i].author = member;
  }




  let lastConference = await Conference
    .find({ type: { $in: [3, 4] } })
    .select('-attender -createdAt -__v -type')
    .sort({ createdAt: -1 })
    .limit(1)
    .lean();


  if (lastConference.length) {
    lastConference = lastConference[0];

    lastConference.createdAt = moment(lastConference.createdAt);

    const provider = await Member.findOne({ _id: lastConference.author });

    lastConference.provider = provider;
  } else {
    lastConference.empty = true;
  }


  res.render('home.njk', {
    lastConf: lastConference,
    articles
  });
});

export default router;
