import { GraphQLObjectType } from 'graphql';
import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import fetch from 'cross-fetch';
import path from 'path';
import { RestLinks } from '../../../restLinks';
import { cache } from '../../../index';

// тип для ввода данных пользователя
const UserLoginType = new GraphQLInputObjectType({
  name: 'UserLogin',
  fields: {
    password: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const JwtTokenType = new GraphQLObjectType({
  name: 'JwtToken',
  fields: () => {
    return {
      jwt: { type: new GraphQLNonNull(GraphQLString) },
    };
  },
});

export const loginUser = {
  type: JwtTokenType,
  description: 'This mutation will login a user and it will return a jwt token',
  args: {
    input: { type: new GraphQLNonNull(UserLoginType) },
  },
  resolve: async (obj: unknown, args: InputType) => {
    const { input } = args;
    
    const result = await _loginUser(input);
    if (result !== undefined){
      cache.key = result.jwt;
    }
    return result;
  },
};

type LoginFields = { password: string; email: string };

type InputType = {
  input: LoginFields;
};

type JwtToken = {
  jwt: string;
};

const _loginUser = async (data: LoginFields): Promise<JwtToken | void> => {
  try {
    const response = await fetch(path.join(RestLinks.Users, 'login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });
    const jwtResponse: unknown = await response.json();
    return (<JwtToken>jwtResponse);
  } catch (error) {
    console.log(error);
  }
  return;
};
