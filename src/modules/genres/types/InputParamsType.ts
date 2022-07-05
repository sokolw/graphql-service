import { GraphQLInt, GraphQLInputObjectType, GraphQLList } from 'graphql';
import { InputFilterGenreType } from './InputFilterGenreType';

export const InputParamsType = new GraphQLInputObjectType({
  name: 'InputParams',
  fields: {
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt },
    filter: { type: new GraphQLList(InputFilterGenreType) },
  },
});
