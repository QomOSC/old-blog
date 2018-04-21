import Article from 'Root/models/Article';

export default async parent => await Article.findById(parent.article).lean();
