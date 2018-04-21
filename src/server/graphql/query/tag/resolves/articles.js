import article from 'Root/graphql/utils/article';
import Tag from 'Root/models/Tag';

export default async parent => {
  const tags = await Tag.find({ tagname: parent.tagname });

  const articles = [];

  for (const i of tags) {
    const art = await article({ _id: i.article }, true);

    articles.push(art);
  }

  return articles;
};
