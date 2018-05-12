import { GraphQLString } from 'graphql';

import UserSchema from 'Root/graphql/query/user/schema';
import resolve from './resolve';

export default {
  type: UserSchema,
  args: {
    name: {
      type: GraphQLString,
    },
  },
  resolve,
};
