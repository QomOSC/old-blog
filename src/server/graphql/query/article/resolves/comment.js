import Comment from 'Root/models/Comment';

export default async parent =>
  await Comment.find({ article: parent._id, type: 2 });
