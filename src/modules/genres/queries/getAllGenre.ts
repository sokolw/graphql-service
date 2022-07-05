import { GraphQLNonNull, GraphQLList } from 'graphql';
import { RestLinks } from '../../../restLinks';
import fetch from 'cross-fetch';
import { GenreType } from '../types/GenreType';
import { IGenre } from '../model/IGenre';
import { InputParamsType } from '../types/InputParamsType';
import { IFilterGenre } from '../model/IFilterGenre';

export const getAllGenre = {
  type: new GraphQLList(new GraphQLNonNull(GenreType)),
  description: 'This query will get all genres',
  args: {
    params: { type: InputParamsType },
  },
  resolve: async (obj: unknown, { params }: InputType) => {
    const result = await _getAllGenre(params);
    return result;
  },
};

type InputType = { params: ParamsType };

type ParamsType = {
  limit: number;
  offset: number;
  filter: Array<IFilterGenre>;
};

interface RawGenre extends IGenre {
  _id: string;
}

interface ResponseGenre {
  items: Array<RawGenre>;
  limit: number;
  offset: number;
  total: number;
}

const _getAllGenre = async (params: ParamsType): Promise<Array<IGenre> | void> => {
  try {
    const response = await fetch(RestLinks.Genres + parseParams(params), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    const rawGenreResponse: unknown = await response.json();
    const typedGenreResponse = <ResponseGenre>rawGenreResponse;
    const genres: Array<IGenre> = typedGenreResponse.items.map((rawGenre) => {
      const genre = <RawGenre>rawGenre;
      return {
        id: genre._id,
        name: genre.name,
        description: genre.description,
        country: genre.country,
        year: genre.year,
      };
    });
    return genres;
  } catch (error) {
    console.log(error);
  }
  return;
};

const isEmptyObject = (obj: Object): boolean => {
  for (const key in obj) {
    return false;
  }
  return true;
};

const parseParams = (params: ParamsType): string => {
  if (!isEmptyObject(params)) {
    const parse = { route: '?' };
    const parts: Array<string> = [];
    if ('limit' in params) {
      parts.push(`limit=${params['limit']}`);
    }
    if ('offset' in params) {
      parts.push(`offset=${params['offset']}`);
    }
    if ('filter' in params) {
      params['filter'].forEach((item) => {
        if ('name' in item) {
          parts.push(`name=${item['name']}`);
        }
        if ('description' in item) {
          parts.push(`description=${item['description']}`);
        }
        if ('country' in item) {
          parts.push(`country=${item['country']}`);
        }
        if ('year' in item) {
          parts.push(`year=${item['year']}`);
        }
      });
    }
    parse.route += parts.join('&');
    return parse.route;
  } else {
    return '';
  }
};
