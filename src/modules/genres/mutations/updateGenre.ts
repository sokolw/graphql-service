import path from 'path';
import { RestLinks } from '../../../restLinks';
import { cache } from './../../../index';
import fetch from 'cross-fetch';
import { GraphQLNonNull, GraphQLID } from 'graphql';
import { GenreType } from './../types/GenreType';
import { IGenre } from './../model/IGenre';
import { IGenreResponse } from '../model/IGenreResponse';
import { InputGenreType } from '../types/InputGenreType';

export const updateGenre = {
  type: new GraphQLNonNull(GenreType),
  description: 'This mutation will update a genre by id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    genre: { type: new GraphQLNonNull(InputGenreType) },
  },
  resolve: async (obj: unknown, args: InputType) => {
    const { id, genre } = args;
    const result = await _updateGenre(id, genre);
    return result;
  },
};

type InputType = { id: string; genre: IGenre };

const _updateGenre = async (id: string, genre: IGenre): Promise<IGenre | void> => {
  try {
    const response = await fetch(path.join(RestLinks.Genres, id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${cache.key}`,
      },
      body: JSON.stringify({
        _id: id,
        ...genre,
      }),
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
