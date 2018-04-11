import Article from 'Root/models/Article';

const resolve = async (parent, args, context) => {
  try {
    const article = await Article.findOne({
      _id: args.id,
      author: context.req.session.user
    }).lean();

    return article;
  } catch (e) {
    return {};
  }
};

export default resolve;
