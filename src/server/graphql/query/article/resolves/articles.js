import article from 'Root/graphql/utils/article';

export default async (parent, args) => {
  if (args.limit) {
    const articles = await article(
      { type: parseInt(args.type) || 2 },
      false,
      args.limit
    );

    return articles;
  }

  const articles = await article({ type: parseInt(args.type) || 2 });

  return articles;
};
