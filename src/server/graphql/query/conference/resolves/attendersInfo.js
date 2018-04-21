import user from 'Root/graphql/utils/user';

export default async (parent, args, context) => {
  if (!context.req.session.user) {
    return [];
  }

  if (!parent.attenders || !parent.attenders.length) {
    return [];
  }

  const users = [];

  for (const i of parent.attenders) {
    const u = await user({ _id: i }, true);

    users.push(u);
  }

  return users;
};
