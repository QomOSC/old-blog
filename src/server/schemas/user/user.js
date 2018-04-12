import { GraphQLString } from 'graphql';

import resolve from './resolves/user';
import UserSchema from './schema';

const UserField = {
  type: UserSchema,
  args: {
    username: {
      type: GraphQLString
    }
  },
  resolve
};

export default UserField;
