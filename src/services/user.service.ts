import { User } from './../models/User.model';
import api from './api';

import { AuthenticatedUser } from 'src/models/AuthenticatedUser.model';

const url: string = '/users';

export const login = async function (
  email: string,
  password: string,
): Promise<AuthenticatedUser | null> {
  const request = api.post(`${url}/login`, {
    email: email,
    password: password,
  });

  return await request
    .then((response) => {
      return { user: response.data.user, token: response.data.token };
    })
    .catch(() => {
      return null;
    });
};

export const createUser = async function (
  name: string,
  email: string,
  password: string,
): Promise<User | null> {
  const request = api.post(`${url}`, { name, email, password });

  return await request
    .then((response) => {
      return {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        pictureUrl: response.data.pictureUrl,
        signUpDate: response.data.signUpDate,
        isCreator: response.data.isCreator,
      };
    })
    .catch(() => {
      return null;
    });
};
