import path from 'path';
import { RestLinks } from '../../../restLinks';
import { cache } from './../../../index';
import fetch from 'cross-fetch';
import { GraphQLNonNull, GraphQLID } from 'graphql';
import { ResponseDeletedItemType } from './../types/ResponseDeletedItemType';

export const deleteGenre = {
  type: ResponseDeletedItemType,
  description: 'This mutation will delete a genre by id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (obj: unknown, args: InputType) => {
    const { id } = args;
    const result = await _deleteGenre(id);
    return result;
  },
};

type InputType = { id: string };

type ResponseDeletedItem = {
  acknowledged: boolean;
  deletedCount: number;
};

const _deleteGenre = async (id: string): Promise<ResponseDeletedItem | void> => {
  try {
    const response = await fetch(path.join(RestLinks.Genres, id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${cache.key}`,
      },
    });
    const rawGenreResponse: unknown = await response.json();
    const genreResponse = <ResponseDeletedItem>rawGenreResponse;
    return genreResponse;
  } catch (error) {
    console.log(error);
  }
  return;
};
