import Tag from 'Root/models/Tag';

export default async (parent, args) =>
  await Tag.findOne({ tagname: args.tagname }).lean();
