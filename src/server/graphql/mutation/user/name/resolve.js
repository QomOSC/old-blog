import User from 'Root/models/User';

export default async (parent, args, context) => {
  if (context.req.session.user) {
    const user = await User.findById(context.req.session.user);

    try {
      user.name = args.name;

      return user.save();
    }

    catch (e) {
      return {};
    }
  }
};
