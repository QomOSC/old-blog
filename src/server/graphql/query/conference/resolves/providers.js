import user from 'Root/graphql/utils/user';

export default async parent => {
  console.log(parent);
  const users = [];

  // for (const i of parent.providers) {
  //   const u = await user({ _id: parent.author });
  //
  // }


  return users;
};
