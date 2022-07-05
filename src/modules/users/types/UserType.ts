import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => {
    return {
      _id: { type: new GraphQLNonNull(GraphQLID) },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      password: { type: GraphQLString },
      email: { type: new GraphQLNonNull(GraphQLString) },
    };
  },
});
