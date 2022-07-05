import { GraphQLObjectType, GraphQLInt, GraphQLBoolean } from 'graphql';

export const ResponseDeletedItemType = new GraphQLObjectType({
  name: 'ResponseDeletedItem',
  fields: {
    acknowledged: { type: GraphQLBoolean },
    deletedCount: { type: GraphQLInt },
  },
});
