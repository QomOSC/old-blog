import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import resolve from './resolve/comment';
import CommentSchema from './schema';

const CommentField = {
  type: new GraphQLList(CommentSchema),
  args: {
    article: {
      type: GraphQLID
    },
    contact: {
      type: GraphQLBoolean
    },
    myArticles: {
      type: GraphQLBoolean
    },
    type: {
      type: GraphQLInt
    }
  },
  resolve
};

export default CommentField;
