import { GraphQLInt, GraphQLID } from 'graphql';

import resolve from './resolves/conference';
import ConferenceSchema from './schema';

export default {
  type: ConferenceSchema,
  args: {
    _id: {
      type: GraphQLID,
    },
    type: {
      type: GraphQLInt,
    },
  },
  resolve,
};
