import { GraphQLObjectType } from 'graphql';
import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import fetch from 'cross-fetch';
import path from 'path';
import { RestLinks } from '../../../restLinks';
import { IUser } from '../model/IUser';
import { UserType } from '../types/UserType';

// тип для ввода данных пользователя
const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const CreateUserPayload = new GraphQLObjectType({
  name: 'CreateUserPayload',
  fields: () => {
    return {
      user: { type: new GraphQLNonNull(UserType) },
    };
  },
});

export const registerUser = {
  type: UserType,
  description: 'This mutation will create a new user and it will return a apiKey',
  args: {
    input: { type: new GraphQLNonNull(UserInputType) },
  },
  resolve: async (obj: unknown, args: InputType) => {
    const { input } = args;

    const result = await createUser(input);
    return result;
  },
};

type InputType = {
  input: IUser;
};

const createUser = async (user: IUser): Promise<IUser | void> => {
  try {
    const response = await fetch(path.join(RestLinks.Users, 'register'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });
    const userResponse: unknown = await response.json();
    return {
      _id: (<IUser>userResponse)._id,
      firstName: (<IUser>userResponse).firstName,
      lastName: (<IUser>userResponse).lastName,
      password: (<IUser>userResponse).password,
      email: (<IUser>userResponse).email,
    };
  } catch (error) {
    console.log(error);
  }
  return;
};
