import { GraphQLObjectType } from 'graphql';

import changeName from './user/name';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    changeName
  })
});

export default mutation;
