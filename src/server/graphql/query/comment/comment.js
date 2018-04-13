import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt
} from 'graphql';

import resolve from './resolve/comment';
import CommentSchema from './schema';

const CommentField = {
  type: new GraphQLList(CommentSchema),
  args: {
    article: {
      type: GraphQLInt
    },
    contact: {
      type: GraphQLBoolean
    }
  },
  resolve
};

export default CommentField;
