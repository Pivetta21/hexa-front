import { ServiceResponse } from '../models/ServiceResponse.model';
import { UpdateUser, User } from './../models/User.model';
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
      serviceResponse.data = response.data;
    })
    .catch((e: AxiosError) => {
      if (e.response) serviceResponse.errorResponse = e.response.data;
    });

  return serviceResponse;
};

export const getEmailConfirmation = async function (
  email: string,
): Promise<ServiceResponse<any>> {
  const request = api.post(`${url}/email-confirmation`, { email });

  const serviceResponse: ServiceResponse<any> = {};

  await request
    .then((response: AxiosResponse) => {
      serviceResponse.data = response.data;
    })
    .catch((e: AxiosError) => {
      if (e.response) serviceResponse.errorResponse = e.response.data;
    });

  return serviceResponse;
};

export const confirmEmail = async function (
  user: User,
  code: number,
): Promise<ServiceResponse<boolean>> {
  const request = api.post(`${url}/confirm-email`, user, {
    params: { code },
  });

  const serviceResponse: ServiceResponse<boolean> = {};

  await request
    .then(() => {
      serviceResponse.data = true;
    })
    .catch((e: AxiosError) => {
      serviceResponse.data = false;
      if (e.response) serviceResponse.errorResponse = e.response.data;
    });

  return serviceResponse;
};

export const updateUser = async function (
  authenticatedUser: AuthenticatedUser,
  user: UpdateUser,
): Promise<ServiceResponse<User>> {
  const request = api.patch(`${url}/${authenticatedUser.user.id}`, user, {
    headers: { Authorization: `Bearer ${authenticatedUser.token}` },
  });

  const serviceResponse: ServiceResponse<User> = {};

  await request
    .then((response: AxiosResponse) => {
      serviceResponse.data = response.data;
    })
    .catch((e: AxiosError) => {
      if (e.response) serviceResponse.errorResponse = e.response.data;
    });

  return serviceResponse;
};
