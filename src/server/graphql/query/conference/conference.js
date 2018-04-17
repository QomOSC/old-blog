import { GraphQLInt, GraphQLID } from 'graphql';

import resolve from './resolves/conference';
import ConferenceSchema from './schema';

const ConferenceField = {
  type: ConferenceSchema,
  args: {
    _id: {
      type: GraphQLID
    },
    type: {
      type: GraphQLInt
    }
  },
  resolve
};

export default ConferenceField;
