import { GraphQLString } from 'graphql';

import resolve from './resolves/tags';
import TagsSchema from './schema';

export default {
  type: TagsSchema,
  args: {
    tagname: {
      type: GraphQLString,
    },
  },
  resolve,
};
