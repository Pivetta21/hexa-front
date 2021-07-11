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
