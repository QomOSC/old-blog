import { Router } from 'express';

const { Comment, Article } = rootRequire('./models');
const { logged } = rootRequire('./perms');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/u/article-comments', logged, async(req, res) => {
  const comments = await Comment.find({
    type: 1,
    author: req.member.user._id
  });

  if (!comments.length) {
    res.render('u/comments/comment.njk', {
      empty: true
    });
    return;
  }

  const allComments = [];

  for (const i of comments) {
    const oneComment = {
      _id: i._id,
      name: i.name,
      email: i.email,
      description: i.description,
      createdAt: moment(i.createdAt)
    };

    const article = await Article.findOne({ _id: i.article });

    if (article) {
      const obj = {
        _id: article._id,
        title: article.title,
        avatar: article.avatar
      };

      oneComment.article = obj;
    }

    allComments.push(oneComment);
  }

  res.render('u/article/comment.njk', {
    comment: allComments
  });
});

export default router;
