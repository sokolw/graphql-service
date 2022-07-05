import { ApolloServer } from 'apollo-server';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { getUserById } from './modules/users/queries/getUserById';
import { verifyUser } from './modules/users/mutations/verifyUser';
import { loginUser } from './modules/users/mutations/loginUser';
import { registerUser } from './modules/users/mutations/registerUser';
import { getGenreById } from './modules/genres/queries/getGenreById';
import { getAllGenre } from './modules/genres/queries/getAllGenre';
import { createGenre } from './modules/genres/mutations/createGenre';
import { deleteGenre } from './modules/genres/mutations/deleteGenre';
import { updateGenre } from './modules/genres/mutations/updateGenre';

export const cache: { key: string } = { key: '' };

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: getUserById,
    genreById: getGenreById,
    allGenres: getAllGenre,
  }),
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    RegisterUser: registerUser,
    //TODO: loginUser move to Query , maybe and verifyUser
    LoginUser: loginUser,
    VerifyUser: verifyUser,
    CreateGenre: createGenre,
    DeleteGenre: deleteGenre,
    UpdateGenre: updateGenre,
  }),
});

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

const main: () => void = async () => {
  const server = new ApolloServer({
    schema: schema,
    csrfPrevention: true,
    cache: 'bounded',
  });

  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

main();
