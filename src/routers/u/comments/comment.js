import { Router } from 'express';

const { Comment } = rootRequire('./models');
const perms = rootRequire('./perms');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/u/comments', perms.logged, perms.u.admin, async(req, res) => {
  const comments = await Comment.find({
    type: 1,
    article: null
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
      title: i.title,
      description: i.description,
      createdAt: moment(i.createdAt)
    };

    allComments.push(oneComment);

  }

  res.render('u/comments/comment.njk', {
    comment: allComments
  });
});

export default router;
