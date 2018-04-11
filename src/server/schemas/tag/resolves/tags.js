import Tag from 'Root/models/Tag';

const resolve = async (parent, args) => {
  const tag = await Tag.findOne({ tagname: args.tagname }).lean();

  return tag;
};

export default resolve;
