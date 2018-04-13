import article from 'Root/graphql/utils/article';

const resolve = async parent => {
  const art = await article({ author: parent._id, type: 2 });

  return art;
};

export default resolve;
