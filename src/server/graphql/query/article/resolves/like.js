import article from 'Root/graphql/utils/article';

export default async (parent, args, context) => {
  if (!context.req.session.user) {
    return false;
  }

  const art = await article({ _id: parent._id }, true);

  if (art.likes.includes(context.req.session.user)) {
    return true;
  }

  return false;
};
