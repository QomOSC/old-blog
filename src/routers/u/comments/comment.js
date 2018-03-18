import { Router } from 'express';

const { Comment } = rootRequire('./models');
const perms = rootRequire('./perms');
const { moment } = rootRequire('./utils');

const router = new Router();

router.get('/u/comments', perms.logged, perms.u.admin, async(req, res) => {
  const comments = await Comment
  .find({ type: 1, article: null, contact: true })
  .select('-__v -type -contact')
  .lean();

  if (!comments.length) {
    res.render('u/comments/comment.njk', {
      empty: true
    });
    return;
  }

  for (const i of comments.keys()) {
    comments[i].createdAt = moment(comments[i].createdAt);
  }

  res.render('u/comments/comment.njk', {
    comment: comments
  });
});

export default router;
