import article from 'Root/schemas/utils/article';

const resolve = async (parent, args, context) => {
  const art = await article(
    { _id: args.id, author: context.req.session.user },
    true
  );

  return art;
};

export default resolve;
