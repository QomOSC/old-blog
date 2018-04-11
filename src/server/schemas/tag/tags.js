import { GraphQLString } from 'graphql';

import resolve from './resolves/tags';
import TagsSchema from './schema';

const TagField = {
  type: TagsSchema,
  args: {
    tagname: {
      type: GraphQLString
    }
  },
  resolve
};

export default TagField;
