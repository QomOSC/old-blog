import user from 'Root/graphql/utils/user';

export default async parent => {
  const u = await user({ _id: parent.author }, true);

  return u;
};
