import { GraphQLList, GraphQLInt } from 'graphql';

import resolve from './resolves/conferences';
import ConferenceSchema from './schema';

export default {
  type: new GraphQLList(ConferenceSchema),
  args: {
    type: {
      type: GraphQLInt,
    },
  },
  resolve,
};
