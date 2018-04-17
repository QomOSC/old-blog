import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import UserSchema from 'Root/graphql/query/user/schema';
import resolveProviders from './resolves/providers';
import resolveAuthor from './resolves/author';

const ConferenceSchema = new GraphQLObjectType({
  name: 'Conference',
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    start: {
      type: GraphQLString
    },
    end: {
      type: GraphQLString
    },
    type: {
      type: GraphQLInt
    },
    createdAt: {
      type: GraphQLString
    },
    author: {
      type: GraphQLID
    },
    authorInfo: {
      type: UserSchema,
      resolve: resolveAuthor
    },
    providers: {
      type: new GraphQLList(GraphQLString)
    },
    providersInfo: {
      type: new GraphQLList(UserSchema),
      resolve: resolveProviders
    }
  })
});

export default ConferenceSchema;
