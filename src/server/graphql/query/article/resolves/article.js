import article from 'Root/graphql/utils/article';

export default async (parent, args) =>
  await article({ _id: args._id, type: parseInt(args.type) || 2 }, true);
