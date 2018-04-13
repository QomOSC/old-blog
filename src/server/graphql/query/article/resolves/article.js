import article from 'Root/graphql/utils/article';

const resolve = async (parent, args) => {
  const art = await article(
    { _id: args._id, type: parseInt(args.type) || 2 },
    true
  );

  return art;
};

export default resolve;
