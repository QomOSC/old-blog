import { GraphQLString } from 'graphql';

import resolve from './resolves/user';
import UserSchema from './schema';

export default {
  type: UserSchema,
  args: {
    username: {
      type: GraphQLString,
    },
  },
  resolve,
};
