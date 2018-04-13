import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

const CommentSchema = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    admin: {
      type: GraphQLString
    },
    answer: {
      type: GraphQLString
    },
    type: {
      type: GraphQLInt
    },
    contact: {
      type: GraphQLBoolean
    },
    article: {
      type: GraphQLInt
    },
    author: {
      type: GraphQLID
    },
    createdAt: {
      type: GraphQLString
    }
  })
});

export default CommentSchema;
