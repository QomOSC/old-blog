import article from 'Root/graphql/utils/article';

export default async (parent, args) => {
  const articles = await article({ type: parseInt(args.type) || 2 });

  return articles;
};
