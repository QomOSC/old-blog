import Comment from 'Root/models/Comment';
import User from 'Root/models/User';

export default async (parent, args, context) => {
  const user = await User.findById(context.req.session.user);
  let comments;

  if (user.type < 3) {
    comments = await Comment.find({ article: args.article, type: 1 });
  } else {
    comments = await Comment.find({ article: args.article });
  }

  return comments;
};
