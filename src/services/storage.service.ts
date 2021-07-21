import api from './api';

import { AxiosResponse, AxiosError } from 'axios';

import { AuthenticatedUser } from './../models/AuthenticatedUser.model';
import { ServiceResponse } from './../models/ServiceResponse.model';
import { FileStorage } from './../models/FileStorage.model';

const url = '/storage';

export enum DeleteImageOptions {
  PROFILE_PICTURE = 'profile',
  CHANNEL_IMAGE = 'channel',
}

export const uploadImage = async (
  authenticatedUser: AuthenticatedUser,
  file: File,
): Promise<ServiceResponse<FileStorage>> => {
  const dataForm = new FormData();
  dataForm.append('file', file);

  const request = api.post(`${url}/images`, dataForm, {
    headers: { Authorization: `Bearer ${authenticatedUser.token}` },
  });

  const serviceResponse: ServiceResponse<FileStorage> = {};

  await request
    .then((response: AxiosResponse) => {
      serviceResponse.data = response.data;
    })
    .catch((e: AxiosError) => {
      if (e.response) serviceResponse.errorResponse = e.response.data;
    });

  return serviceResponse;
};

export const deleteImage = async (
  authenticatedUser: AuthenticatedUser,
  deleteOption: DeleteImageOptions,
  fileUrl: string,
): Promise<ServiceResponse<void>> => {
  const filename = parseFilename(fileUrl);

  const request = api.delete(`${url}/images/${deleteOption}/${filename}`, {
    headers: { Authorization: `Bearer ${authenticatedUser.token}` },
  });

  const serviceResponse: ServiceResponse<void> = {};

  await request.then().catch((e: AxiosError) => {
    if (e.response) serviceResponse.errorResponse = e.response.data;
  });

  return serviceResponse;
};

export const parseFilename = (url: string) => {
  return url.substring(url.lastIndexOf('/') + 1);
};
