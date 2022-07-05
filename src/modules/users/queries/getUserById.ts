import { GraphQLID, GraphQLNonNull } from 'graphql';
import { UserType } from '../types/UserType';
import { RestLinks } from '../../../restLinks';
import path from 'path';
import { IUser } from '../model/IUser';
import fetch from 'cross-fetch';

export const getUserById = {
  type: new GraphQLNonNull(UserType),
  description: 'This query will search for a user with a specific userId',
  args: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (obj: unknown, args: InputType) => {
    const { userId } = args;
    const result = await getUser(userId);
    return result;
  },
};

type InputType = { userId: string };

const getUser = async (id: string): Promise<IUser | void> => {
  try {
    const response = await fetch(path.join(RestLinks.Users, id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
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
