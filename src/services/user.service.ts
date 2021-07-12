import { ServiceResponse } from '../models/ServiceResponse.model';
import { User } from './../models/User.model';
import api from './api';

import { AuthenticatedUser } from 'src/models/AuthenticatedUser.model';
import { AxiosError, AxiosResponse } from 'axios';

const url: string = '/users';

export const login = async function (
  email: string,
  password: string,
): Promise<ServiceResponse<AuthenticatedUser>> {
  const request = api.post(`${url}/login`, {
    email: email,
    password: password,
  });

  const serviceResponse: ServiceResponse<AuthenticatedUser> = {};

  await request
    .then((response: AxiosResponse) => {
      serviceResponse.data = {
        user: response.data.user,
        token: response.data.token,
      };
    })
    .catch((e: AxiosError) => {
      if (e.response) serviceResponse.errorResponse = e.response.data;
    });

  return serviceResponse;
};

export const createUser = async function (
  name: string,
  email: string,
  password: string,
): Promise<ServiceResponse<User>> {
  const request = api.post(`${url}`, { name, email, password });

  const serviceResponse: ServiceResponse<User> = {};

  await request
    .then((response: AxiosResponse) => {
      serviceResponse.data = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        pictureUrl: response.data.pictureUrl,
        signUpDate: response.data.signUpDate,
        isCreator: response.data.isCreator,
      };
    })
    .catch((e: AxiosError) => {
      if (e.response) serviceResponse.errorResponse = e.response.data;
    });

  return serviceResponse;
};
