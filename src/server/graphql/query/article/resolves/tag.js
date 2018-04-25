import Tag from 'Root/models/Tag';

export default async parent => await Tag.find({ article: parent._id });
