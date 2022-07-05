import path from 'path';
import { RestLinks } from '../../../restLinks';
import { cache } from './../../../index';
import fetch from 'cross-fetch';
import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

const VerifiedUserType = new GraphQLObjectType({
  name: 'VerifiedUser',
  fields: {
    _id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    iat: { type: GraphQLInt },
  },
});

export const verifyUser = {
  type: VerifiedUserType,
  description: 'This mutation will verify a new user and it will return user',
  resolve: async () => {
    const result = await _verifyUser();
    return result;
  },
};

const _verifyUser = async (): Promise<VerifiedUser | void> => {
  try {
    const response = await fetch(path.join(RestLinks.Users, 'verify'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${cache.key}`,
      },
    });
    const userResponse: unknown = await response.json();
    return {
      _id: (<VerifiedUser>userResponse)._id,
      firstName: (<VerifiedUser>userResponse).firstName,
      lastName: (<VerifiedUser>userResponse).lastName,
      iat: (<VerifiedUser>userResponse).iat,
      email: (<VerifiedUser>userResponse).email,
    };
  } catch (error) {
    console.log(error);
  }
  return;
};

type VerifiedUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  iat: number;
};
