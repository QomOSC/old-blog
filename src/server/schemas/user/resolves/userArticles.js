import Article from 'Root/models/Article';

const resolve = async parent => {
  const article = await Article
  .find({ author: parent._id, type: 2 })
  .sort({ createdAt: -1 })
  .lean();

  return article;
};

export default resolve;
