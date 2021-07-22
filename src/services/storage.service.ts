import api from './api';

import { AxiosResponse, AxiosError } from 'axios';

import { ServiceResponse } from './../models/ServiceResponse.model';
import { FileStorage } from './../models/FileStorage.model';

const url = '/storage';

export enum DeleteImageOptions {
  PROFILE_PICTURE = 'profile',
  CHANNEL_IMAGE = 'channel',
}

export const uploadImage = async (
  access_token: string,
  file: File,
): Promise<ServiceResponse<FileStorage>> => {
  const dataForm = new FormData();
  dataForm.append('file', file);

  const request = api.post(`${url}/images`, dataForm, {
    headers: { Authorization: `Bearer ${access_token}` },
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
  access_token: string,
  deleteOption: DeleteImageOptions,
  fileUrl: string,
): Promise<ServiceResponse<void>> => {
  const filename = parseFilename(fileUrl);

  const request = api.delete(`${url}/images/${deleteOption}/${filename}`, {
    headers: { Authorization: `Bearer ${access_token}` },
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const isFileVideo = (file: File) => {
  return file && file['type'].split('/')[0] == 'video';
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const isFileVideoAccepted = (file: File) => {
  const acceptedVideoTypes = [
    'video/mp4',
    'video/avi',
    'video/mov',
    'video/webm',
    'video/flv',
  ];

  return file && acceptedVideoTypes.includes(file['type']);
};

export const isFileImage = (file: File) => {
  return file && file['type'].split('/')[0] === 'image';
};

export const isFileImageAccepted = (file: File) => {
  const acceptedImageTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
  ];

  return file && acceptedImageTypes.includes(file['type']);
};
