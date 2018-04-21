import article from 'Root/graphql/utils/article';

export default async (parent, args, context) => {
  if (!context.req.session.user) {
    return false;
  }

  return await article({ _id: parent._id }, true)
    .likes
    .includes(context.req.session.user) ?
      true :
      false;
};
