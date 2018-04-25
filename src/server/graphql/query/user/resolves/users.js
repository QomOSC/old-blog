import user from 'Root/graphql/utils/user';

export default async (parent, args, context) => {
  if (!context.req.session.user) {
    return [];
  }

  const admin = await user({ _id: context.req.session.user }, true);

  return admin.type >= 3 ?
    await user({ type: args.type || 2 }) :
    [];
};
