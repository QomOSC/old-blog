import { GraphQLList, GraphQLID } from 'graphql';

import resolve from './resolves/users';
import UserSchema from './schema';

const UsersField = {
  type: new GraphQLList(UserSchema),
  args: {
    type: {
      type: GraphQLID
    }
  },
  resolve
};

export default UsersField;
