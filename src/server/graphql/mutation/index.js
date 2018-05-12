import { GraphQLObjectType } from 'graphql';

import changeName from './user/name';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    changeName,
  }),
});
