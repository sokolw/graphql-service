import { GraphQLString, GraphQLInt, GraphQLInputObjectType } from 'graphql';

export const InputFilterGenreType = new GraphQLInputObjectType({
  name: 'InputFilterGenre',
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    country: { type: GraphQLString },
    year: { type: GraphQLInt },
  },
});
