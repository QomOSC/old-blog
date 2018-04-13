import Comment from 'Root/models/Comment';

export default async (parent, args) => {
  const comments = await Comment.find({ article: args.article });

  return comments;
};
