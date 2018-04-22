import article from 'Root/graphql/utils/article';

export default async (parent, args, context) =>
  context.req.session.user ?
    await article({ _id: parent._id }, true)
      .likes
      .includes(context.req.session.user) :
    false;
