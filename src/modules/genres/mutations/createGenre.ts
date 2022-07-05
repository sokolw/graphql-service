import path from 'path';
import { RestLinks } from '../../../restLinks';
import { cache } from './../../../index';
import fetch from 'cross-fetch';
import { GraphQLNonNull } from 'graphql';
import { GenreType } from './../types/GenreType';
import { IGenre } from './../model/IGenre';
import { IGenreResponse } from '../model/IGenreResponse';
import { InputGenreType } from '../types/InputGenreType';

export const createGenre = {
  type: new GraphQLNonNull(GenreType),
  description: 'This mutation will create a new genre and it will return this genre',
  args: {
    genre: { type: new GraphQLNonNull(InputGenreType) },
  },
  resolve: async (obj: unknown, args: InputType) => {
    const { genre } = args;
    const result = await _createGenre(genre);
    return result;
  },
};

type InputType = { genre: IGenre };

const _createGenre = async (genre: IGenre): Promise<IGenre | void> => {
  try {
    const response = await fetch(path.join(RestLinks.Genres), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${cache.key}`,
      },
      body: JSON.stringify(genre),
    });
    const rawGenreResponse: unknown = await response.json();
    const genreResponse = <IGenreResponse>rawGenreResponse;
    return {
      id: genreResponse._id,
      name: genreResponse.name,
      description: genreResponse.description,
      country: genreResponse.country,
      year: genreResponse.year,
    };
  } catch (error) {
    console.log(error);
  }
  return;
};
