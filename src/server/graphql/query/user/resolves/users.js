import user from 'Root/graphql/utils/user';

export default async (parent, args, context) => {
  if (!context.req.session.user) {
    return [];
  }

  return await user({ _id: context.req.session.user }, true).type < 3 ?
    await user({ type: parseInt(args.type) || 2 }) :
    [];
};
