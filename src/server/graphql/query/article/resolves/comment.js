import Comment from 'Root/models/Comment';

export default async parent => {
  const comments = await Comment.find({ article: parent._id, type: 2 });

  return comments;
};
