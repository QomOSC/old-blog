import { Router } from 'express';

const { Article, Member, Tag } = rootRequire('./models');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/tag/:tagname', async(req, res) => {
  const page = parseInt(req.query.page) || 0,
  start = page * 12,
  stop = page * 12 + 12;

  const tags = await Tag
  .find({ tagname: req.params.tagname })
  .sort({ createdAt: -1 })
  .skip(start)
  .limit(stop);

  if (tags.length === 0) {
    res.render('tag.njk', {
      empty: true,
      tagname: req.params.tagname
    });
  } else {

    const tagsInfo = [];

    function* getResponse() {
      for (const i of tags) {
        yield new Promise(async resolve => {

          const oneTag = {
            author: {},
            article: {}
          };

          const article = await Article.findOne({ _id: i.article });

          if (article) {
            let content = article.content.split('').slice(0, 130);
            content.push('.', '.', '.');
            content = content.join('');

            oneTag.article.title = article.title;
            oneTag.article._id = article._id;
            oneTag.article.createdAt = moment(article.createdAt);
            oneTag.article.likes = article.likes.length;
            oneTag.article.viewers = article.viewers.length;
            oneTag.article.avatar = article.avatar;
            oneTag.article.content;

            const member = await Member.findOne({ _id: article.author });

            if (member) {
              oneTag.author.fname = member.fname;
              oneTag.author.lname = member.lname;
              oneTag.author.username = member.username;
              oneTag.author.avatar = member.avatar;

              tagsInfo.push(oneTag);
              resolve();
            } else {
              res.reply.error();
            }
          }
        });
      }
    }

    const iterator = getResponse();
    (function loop() {

      const next = iterator.next();
      if (next.done) {
        res.render('tag.njk', {
          tags: tagsInfo,
          tagname: req.params.tagname
        });

        return;
      }

      next.value.then(loop);
    })();

  }
});

export default router;
