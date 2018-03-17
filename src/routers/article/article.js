import { Router } from 'express';

const { Article, Member, Tag, Comment } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/article', async(req, res) => {
  const page = parseInt(req.query.page) || 0,
  start = page * 12,
  stop = page * 12 + 12;

  const re = new RegExp(`.*${req.query.q || ''}.*`);

  const articles = await Article
    .find({ title: re })
    .sort({ createdAt: -1 })
    .skip(start)
    .limit(stop);

  if (!articles.length) {
    res.render('articles.njk', {
      empty: true,
      q: req.query.q
    });
    return;
  }

  const allArts = [];

  for (const i of articles) {
      let content = i.content.split('').slice(0, 130);
      content.push('.', '.', '.');
      content = content.join('');

      const oneArt = {
        _id: i._id,
        title: i.title,
        createdAt: moment(i.createdAt),
        likes: i.likes.length,
        viewers: i.viewers.length,
        avatar: i.avatar,
        author: {},
        content
      };

      const member = await Member.findOne({ _id: i.author });

      if (!member) {
        res.reply.error();
        return;
      }

      oneArt.author.fname = member.fname;
      oneArt.author.lname = member.lname;
      oneArt.author.username = member.username;
      oneArt.author.avatar = member.avatar;

      allArts.push(oneArt);
  }

  res.render('articles.njk', {
    q: req.query.q,
    arts: allArts
  });
});



router.get('/article/:id', async(req, res) => {
  req.params.id = req.params.id.toLowerCase();
  let article;

  try {
    article = await Article
      .findOne({ _id: req.params.id, type: 2 })
      .select('-type -__v')
      .lean();
  } catch (e) {
    res.reply.notFound();
    return;
  }

  if (!article) {
    res.reply.notFound();
    return;
  }

  if (req.member.user) {
    article.liked = article.likes.includes(req.member.user._id);
  }

  article.createdAt = moment(article.createdAt);
  article.likes = article.likes.length;
  article.viewers = article.viewers.length;
  article.tags = [];
  article.comments = [];

  const tags = await Tag
    .find({ article: article._id })
    .select('-__v -_id -article -createdAt');

  if (tags.length) {
    for (const i of tags) {
      article.tags.push(i.tagname);
    }
  }

  const comment = await Comment
    .find({ type: 2, article: req.params.id })
    .select('-_id -article -type -__v')
    .lean();

  if (comment.length) {
    for (const i of comment.keys()) {
      comment[i].createdAt = moment(comment[i].createdAt);

      let commentAdmin;

      if (comment[i].author) {
        try {
          commentAdmin = await Member
            .findOne({ _id: comment[i].author })
            .select(`-_id -password -__v
            -submembers -articles -createdAt -type`)
            .lean();

          comment[i].admin = commentAdmin;
        } catch (e) {
          comment[i].admin = null;
        }
      }

      article.comments.push(comment[i]);
    }
  }

  const author = await Member
    .findOne({ _id: article.author })
    .select('-__v -_id -password -submembers -articles -createdAt -type')
    .lean();

  if (!author) {
    res.reply.notFound();
    return;
  }

  article.author = author;

  console.log(JSON.stringify(article, null, 2));
  res.render('article.njk', { article });
});


// Add viewer IP
router.post('/article/:id', async(req, res) => {
  req.params.id = req.params.id.toLowerCase();

  const article = await Article.findOne({ _id: req.params.id });

  if (!article) {
    res.json({ done: false });
    return;
  }

  if (article.viewers.includes(req.body.ip)) {
    res.json({ done: true });
    return;
  }

  article.viewers.push(req.body.ip);

  try {
    await article.save();
    res.json({ done: true });
  } catch (e) {
    res.json({ done: false });
  }
});

export default router;
