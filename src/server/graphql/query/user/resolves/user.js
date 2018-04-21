import user from 'Root/graphql/utils/user';

export default async (parent, args, context) => args.username ?
  await user({ username: args.username.toLowerCase() }, true) :
  await user({ _id: context.req.session.user }, true);
