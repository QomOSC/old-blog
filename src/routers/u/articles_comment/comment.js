import { Router } from 'express';

const { Comment, Article } = rootRequire('./models');
const { logged } = rootRequire('./perms');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/u/article-comments', logged, async(req, res) => {
  const comments = await Comment
    .find({ type: 1, author: req.member.user._id })
    .select('-__v -type')
    .lean();

  if (!comments.length) {
    res.render('u/comments/comment.njk', {
      empty: true
    });
    return;
  }

  for (const i of comments.keys()) {
    comments[i].createdAt = moment(comments[i].createdAt);

    const article = await Article
      .findOne({ _id: comments[i].article })
      .select('title avatar _id');

    if (article) {
      comments[i].article = article;
    }
  }

  res.render('u/article/comment.njk', {
    comment: comments
  });
});

export default router;
