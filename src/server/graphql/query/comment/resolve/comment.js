import Comment from 'Root/models/Comment';

export default async (parent, args, context) => {
  if (!context.req.session.user) {
    return [];
  }

  if (args.myArticles) {
    const comments = await Comment.find({
      author: context.req.session.user,
      type: 1
    });

    return comments;
  }
};
