import user from 'Root/graphql/utils/user';

export default async parent => await user({ _id: parent.author }, true);
