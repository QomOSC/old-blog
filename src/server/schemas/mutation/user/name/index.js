import { GraphQLString } from 'graphql';

import UserSchema from 'Root/schemas/query/user/schema';
import resolve from './resolve';

const changeName = {
  type: UserSchema,
  args: {
    name: {
      type: GraphQLString
    }
  },
  resolve
};

export default changeName;
