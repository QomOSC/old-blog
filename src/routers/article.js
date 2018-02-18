import { Router } from 'express';

const { Article, Member, Tag } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

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
