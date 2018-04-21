import user from 'Root/graphql/utils/user';

export default async parent => {
  const users = [];

  for (const i of parent.providers) {
    const u = await user({ username: i }, true);

    users.push(u);
  }

  return users;
};
