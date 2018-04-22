import article from 'Root/graphql/utils/article';

export default async parent => await article({ author: parent._id, type: 2 });
