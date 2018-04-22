import article from 'Root/graphql/utils/article';

export default async parent => await article({ _id: parent.article }, true);
