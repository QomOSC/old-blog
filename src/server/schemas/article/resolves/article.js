import Article from 'Root/models/Article';

const resolve = async (parent, args) => {
  try {
    const a = await Article
    .findOne({
      _id: args._id,
      type: args.type || 2
    })
    .sort({ createdAt: -1 })
    .lean();

    return a;
  } catch (e) {
    return {};
  }
};

export default resolve;
