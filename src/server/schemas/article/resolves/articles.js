import Article from 'Root/models/Article';

export default async (parent, args) => {
  let arts = await Article
    .find({ type: parseInt(args.type) || 2 })
    .sort({ createdAt: -1 })
    .select('-__v')
    .lean();

  for (const i of arts.keys()) {
    arts[i].viewers = arts[i].viewers.length;
    arts[i].likes = arts[i].likes.length;
  }

  return arts;
};
