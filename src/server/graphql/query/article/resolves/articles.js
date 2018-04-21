import article from 'Root/graphql/utils/article';

export default async (parent, args) =>
  args.limit ?
    await article({ type: parseInt(args.type) || 2 }, false, args.limit) :
    await article({ type: parseInt(args.type) || 2 });
