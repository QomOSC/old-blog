import { GraphQLString } from 'graphql';

import Tag from 'Root/models/Tag';

import TagsSchema from './schema';

const TagField = {
  type: TagsSchema,
  args: {
    tagname: {
      type: GraphQLString
    }
  },
  async resolve(parent, args) {
    const tag = await Tag.findOne({ tagname: args.tagname }).lean();

    return tag;
  }
};

export default TagField;
