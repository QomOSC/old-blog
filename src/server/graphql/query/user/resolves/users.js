import user from 'Root/graphql/utils/user';

export default async (parent, args, context) => {
  if (!context.req.session.user) {
    return [];
  }

  const admin = await user({ _id: context.req.session.user }, true);

  if (admin.type < 3) {
    return [];
  }

  const users = await user({ type: parseInt(args.type) || 2 });

  return users;
};
