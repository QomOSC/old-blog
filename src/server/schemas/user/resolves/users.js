import User from 'Root/models/User';

export default async (parent, args, context) => {
  if (!context.req.session.user) {
    return [];
  }

  const admin = await User.findById(context.req.session.user);

  if (admin.type < 3) {
    return [];
  }

  const users = await User
  .find({ type: parseInt(args.type) || 2 })
  .select('-password -submembers')
  .lean();


  for (const [i, v] of users.entries()) {
    users[i] = {
      ...v,
      articles: v.articles.length
    };
  }

  return users;
};
