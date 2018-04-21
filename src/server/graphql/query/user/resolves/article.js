import article from 'Root/graphql/utils/article';

export default async (parent, args, context) =>
  await article({ _id: args._id, author: context.req.session.user }, true);
