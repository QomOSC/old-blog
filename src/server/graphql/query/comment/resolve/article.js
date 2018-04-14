import Article from 'Root/models/Article';

export default async parent => {
  const article = await Article.findById(parent.article);

  return article;
};
