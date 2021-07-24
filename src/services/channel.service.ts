import api from './api';
import { AxiosResponse, AxiosError } from 'axios';

import nobanner from 'src/assets/images/nobanner.jpeg';

import {
  deleteImage,
  DeleteImageOptions,
  uploadImage,
} from './storage.service';

import { ServiceResponse } from 'src/models/ServiceResponse.model';
import {
  ChannelI,
  CreateChannelI,
  UpdateChannelI,
} from './../models/Channel.model';

const url = '/channels';

export async function findAllChannels(): Promise<ServiceResponse<ChannelI[]>> {
  const serviceResponse = {} as ServiceResponse<ChannelI[]>;

  const request = api.get(`${url}`);

  await request
    .then((response: AxiosResponse) => {
      serviceResponse.data = response.data;
    })
    .catch((e: AxiosError) => {
      if (e.response) serviceResponse.errorResponse = e.response.data;
    });

  return serviceResponse;
}

export async function findChannel(
  channelId: number,
): Promise<ServiceResponse<ChannelI>> {
  const serviceResponse = {} as ServiceResponse<ChannelI>;

  const request = api.get(`${url}/${channelId}`);

  await request
    .then((response: AxiosResponse) => {
      serviceResponse.data = response.data;
    })
    .catch((e: AxiosError) => {
      if (e.response) serviceResponse.errorResponse = e.response.data;
    });

  return serviceResponse;
}

export async function createChannel(
  access_token: string,
  createChannel: CreateChannelI,
): Promise<ServiceResponse<ChannelI>> {
  const serviceResponse = {} as ServiceResponse<ChannelI>;

  const request = api.post(`${url}`, createChannel, {
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
}

export async function findChannelByUserId(
  userId: number,
): Promise<ServiceResponse<ChannelI>> {
  const serviceResponse = {} as ServiceResponse<ChannelI>;

  const request = api.get(`${url}`, { params: { userId } });

  await request
    .then((response: AxiosResponse) => {
      serviceResponse.data = response.data;
    })
    .catch((e: AxiosError) => {
      if (e.response) serviceResponse.errorResponse = e.response.data;
    });

  return serviceResponse;
}

export const updateChannel = async function (
  access_token: string,
  channelId: number,
  updateChannel: UpdateChannelI,
): Promise<ServiceResponse<ChannelI>> {
  const serviceResponse = {} as ServiceResponse<ChannelI>;

  const request = api.patch(`${url}/${channelId}`, updateChannel, {
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

export async function deleteChannel(access_token: string, channelId: number) {
  const serviceResponse = {} as ServiceResponse<boolean>;

  const request = api.delete(`${url}/${channelId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  await request
    .then(() => {
      serviceResponse.data = true;
    })
    .catch((e: AxiosError) => {
      if (e.response) serviceResponse.errorResponse = e.response.data;
    });

  return serviceResponse;
}

export function getBannerPicture(channel: ChannelI) {
  if (channel.banner_url && channel.banner_url.length > 0) {
    return process.env.REACT_APP_SERVER_URL + '/' + channel.banner_url;
  }

  return nobanner;
}

export function deleteBannerPicture(access_token: string, channel: ChannelI) {
  const filePath = channel.banner_url;
  if (filePath && filePath.length > 0) {
    deleteImage(access_token, DeleteImageOptions.CHANNEL_IMAGE, filePath);
  }
}

export async function uploadBannerPicture(
  access_token: string,
  channelId: number,
  file: File,
): Promise<ServiceResponse<ChannelI>> {
  let serviceResponse = {} as ServiceResponse<ChannelI>;

  const uploadImageResponse = await uploadImage(access_token, file);

  if (uploadImageResponse.data) {
    serviceResponse = await updateChannel(access_token, channelId, {
      banner_url: uploadImageResponse.data.path,
    });
  } else {
    serviceResponse.errorResponse = uploadImageResponse.errorResponse;
  }

  return serviceResponse;
}
