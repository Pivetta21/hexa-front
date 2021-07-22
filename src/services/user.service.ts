import api from './api';
import { AxiosError, AxiosResponse } from 'axios';

import { ServiceResponse } from '../models/ServiceResponse.model';
import { AuthenticatedUser } from '../models/AuthenticatedUser.model';
import { UpdateUser, User } from '../models/User.model';

import nopic from 'src/assets/images/nopic.webp';

import {
  deleteImage,
  DeleteImageOptions,
  uploadImage,
} from './storage.service';

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
  access_token: string,
  userId: number,
  updatedUser: UpdateUser,
): Promise<ServiceResponse<User>> {
  const serviceResponse = {} as ServiceResponse<User>;

  const request = api.patch(`${url}/${userId}`, updatedUser, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  await request
    .then((response: AxiosResponse) => {
      serviceResponse.data = response.data;
    })
    .catch((e: AxiosError) => {
      if (e.response) serviceResponse.errorResponse = e.response.data;
    });

  return serviceResponse;
};

export const deleteUser = async function (
  access_token: string,
  userId: number,
): Promise<ServiceResponse<boolean>> {
  const serviceResponse = {} as ServiceResponse<boolean>;

  const request = api.delete(`${url}/${userId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

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

export function getProfilePicture(
  authenticatedUser: AuthenticatedUser | null,
): string {
  const userPicture = authenticatedUser?.user.pictureUrl;

  if (userPicture && userPicture.length > 0) {
    return `${process.env.REACT_APP_SERVER_URL}/${userPicture}`;
  }

  return nopic;
}

export function deleteProfilePicture(authenticatedUser: AuthenticatedUser) {
  const userPicture = authenticatedUser.user.pictureUrl;
  const access_token = authenticatedUser.token;

  if (userPicture && access_token) {
    deleteImage(access_token, DeleteImageOptions.PROFILE_PICTURE, userPicture);
  }
}

export async function uploadProfilePicture(
  access_token: string,
  userId: number,
  file: File,
): Promise<ServiceResponse<User>> {
  let serviceResponse = {} as ServiceResponse<User>;

  const uploadImageResponse = await uploadImage(access_token, file);

  if (uploadImageResponse.data) {
    serviceResponse = await updateUser(access_token, userId, {
      pictureUrl: uploadImageResponse.data.path,
    });
  } else {
    serviceResponse.errorResponse = uploadImageResponse.errorResponse;
  }

  return serviceResponse;
}
