import user from 'Root/graphql/utils/user';

const resolve = async parent => {
  const u = await user({ _id: parent.author }, true);

  return u;
};

export default resolve;
