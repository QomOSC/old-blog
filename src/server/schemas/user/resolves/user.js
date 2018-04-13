import user from 'Root/schemas/utils/user';

export default async (parent, args, context) => {

  if (!args.username) {
    const u = await user({ _id: context.req.session.user }, true);

    return u;
  }

  const u = await user({ username: args.username.toLowerCase() }, true);

  return u;
};
