import { gql } from 'apollo-server';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } from 'graphql';

export const GenreType = new GraphQLObjectType({
  name: 'Genre',
  fields: () => {
    return {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      country: { type: GraphQLString },
      year: { type: GraphQLInt },
    };
  },
});

//graphql schema
gql`
  type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
  }
`;
