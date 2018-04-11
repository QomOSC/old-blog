import { GraphQLString } from 'graphql';

import User from 'Root/models/User';

import UserSchema from './schema';

const UserField = {
  type: UserSchema,
  args: {
    username: {
      type: GraphQLString
    }
  },
  async resolve(parent, args, context) {
    let user;

    if (!args.username) {
      user = await User
        .findById(context.req.session.user)
        .select('-password -__v -submembers')
        .lean();
    } else {
      user = await User
        .findOne({ username: args.username.toLowerCase() })
        .select('-password -__v -submembers')
        .lean();
    }

    if (user) {
      user = {
        ...user,
        articles: user.articles.length
      };
    }

    return user;
  }
};

export default UserField;
