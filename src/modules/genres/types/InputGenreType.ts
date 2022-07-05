import { GraphQLString, GraphQLInt, GraphQLInputObjectType } from 'graphql';

export const InputGenreType = new GraphQLInputObjectType({
  name: 'InputGenre',
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    country: { type: GraphQLString },
    year: { type: GraphQLInt },
  },
});
