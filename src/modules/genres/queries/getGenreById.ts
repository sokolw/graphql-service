import { GraphQLID, GraphQLNonNull } from 'graphql';
import { RestLinks } from '../../../restLinks';
import path from 'path';
import fetch from 'cross-fetch';
import { GenreType } from '../types/GenreType';
import { IGenre } from '../model/IGenre';
import { IGenreResponse } from '../model/IGenreResponse';

export const getGenreById = {
  type: new GraphQLNonNull(GenreType),
  description: 'This query will search for a genre with a specific genreId',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (obj: unknown, { id }: InputType) => {
    const result = await _getGenreById(id);
    return result;
  },
};

type InputType = { id: string };

const _getGenreById = async (id: string): Promise<IGenre | void> => {
  try {
    const response = await fetch(path.join(RestLinks.Genres, id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    const rawGenreResponse: unknown = await response.json();
    const genre = <IGenreResponse>rawGenreResponse;
    return {
      id: genre._id,
      name: genre.name,
      description: genre.description,
      country: genre.country,
      year: genre.year,
    };
  } catch (error) {
    console.log(error);
  }
  return;
};
