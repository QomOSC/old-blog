import User from 'Root/models/User';

export default async (parent, args, context) => {
  let user;

  if (!args.username) {
    user = await User
      .findById(context.req.session.user)
      .select('-password -__v -submembers')
      .lean();
  } else {
    user = await User
      .findOne({ username: args.username.toLowerCase() })
      .select('-password -__v -submembers')
      .lean();
  }

  if (user) {
    user = {
      ...user,
      articles: user.articles.length
    };
  }

  return user;
};
