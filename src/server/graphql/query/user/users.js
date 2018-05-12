import { GraphQLList, GraphQLID } from 'graphql';

import resolve from './resolves/users';
import UserSchema from './schema';

export default {
  type: new GraphQLList(UserSchema),
  args: {
    type: {
      type: GraphQLID,
    },
  },
  resolve,
};
