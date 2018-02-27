import { Router } from 'express';

const { Article, Member, Tag, Comment } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/article', async(req, res) => {
  const page = parseInt(req.query.page) || 0,
  start = page * 12,
  stop = page * 12 + 12;

  const re = new RegExp(`.*${req.query.q || ''}.*`);

  const articles = await Article.find({ title: re })
  .sort({ createdAt: -1 })
  .skip(start)
  .limit(stop);

  if (articles.length === 0) {
    res.render('articles.njk', {
      empty: true,
      q: req.query.q
    });
  } else {

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

        if (member) {
          oneArt.author.fname = member.fname;
          oneArt.author.lname = member.lname;
          oneArt.author.username = member.username;
          oneArt.author.avatar = member.avatar;

          allArts.push(oneArt);
        } else {
          res.reply.error();
        }
    }

    res.render('articles.njk', {
      q: req.query.q,
      arts: allArts
    });
  }
});

router.get('/article/:id', async(req, res) => {
  req.params.id = req.params.id.toLowerCase();

  const article = await Article.findOne({ _id: req.params.id });

  if (article) {
    const oneArt = { article, author: {}, other: {}, liked: false, tags: [] };

    oneArt.other.createdAt = moment(article.createdAt);
    oneArt.other.likes = article.likes.length;
    oneArt.other.viewers = article.viewers.length;

    if (req.member.user) {
      oneArt.liked =
        article.likes.indexOf(req.member.user._id) !== -1 ? true : false;
    }

    const tags = await Tag.find({ article: article._id });

    if (tags.length !== 0) {
      for (const i of tags) {
        oneArt.tags.push(i.tagname);
      }
    }

    const comment = await Comment.find({ type: 2, article: req.params.id });

    if (comment.length !== 0) {
      const allComments = [];

      for (const i of comment) {
        const oneCom = {
          name: i.name,
          email: i.email,
          title: i.title,
          answer: i.answer,
          description: i.description,
          createdAt: moment(i.createdAt)
        };
        allComments.push(oneCom);
      }
      oneArt.comments = allComments;
    }

    const member = await Member.findOne({ _id: article.author });

    if (member) {
      oneArt.author.avatar = member.avatar;
      oneArt.author.fname = member.fname;
      oneArt.author.lname = member.lname;
      oneArt.author.username = member.username;
      oneArt.author.description = member.description;

      res.render('article.njk', { p: oneArt });
    } else {
      res.reply.notFound();
    }
  } else {
    res.reply.notFound();
  }
});

// Add viewer IP

router.post('/article/:id', async(req, res) => {
  req.params.id = req.params.id.toLowerCase();

  const article = await Article.findOne({ _id: req.params.id });

  if (article) {
    if (!article.viewers.includes(req.body.ip)) {
      article.viewers.push(req.body.ip);

      article.save().then(() => {
        res.json({ done: true });
      }).catch(() => {
        res.json({ done: false });
      });
    } else {
      res.json({ done: true });
    }
  } else {
    res.json({ done: false });
  }
});

export default router;
