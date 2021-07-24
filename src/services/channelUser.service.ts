import { FollowChannelDto } from './../models/ChannelUser.model';
import api, { axiosFetch } from './api';

import { ChannelUser } from 'src/models/ChannelUser.model';
import { ServiceResponse } from 'src/models/ServiceResponse.model';

const url = 'channel-user';

export function followChannel(
  followChannelDto: FollowChannelDto,
  access_token: string,
): Promise<ServiceResponse<ChannelUser>> {
  const request = api.post(
    `${url}/follow-channel`,
    { ...followChannelDto },
    {
      headers: { Authorization: `Bearer ${access_token}` },
    },
  );

  return axiosFetch<ChannelUser>(request);
}

export function unfollowChannel(
  channelId: number,
  access_token: string,
): Promise<ServiceResponse<void>> {
  const request = api.delete(`${url}/unfollow-channel/${channelId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return axiosFetch<void>(request);
}

export function checkIfUserIsFollowingChannel(
  followChannelDto: FollowChannelDto,
  access_token: string,
): Promise<ServiceResponse<boolean>> {
  const request = api.get(`${url}/follow-channel`, {
    params: { ...followChannelDto },
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return axiosFetch<boolean>(request);
}

export async function findFollowingChannels(
  userId: number,
  access_token: string,
): Promise<ServiceResponse<ChannelUser[]>> {
  const request = api.get(`${url}/channels/${userId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return axiosFetch<ChannelUser[]>(request);
}

export async function findChannelFollowers(
  channelId: number,
): Promise<ServiceResponse<ChannelUser[]>> {
  const request = api.get(`${url}/followers/${channelId}`);

  return axiosFetch<ChannelUser[]>(request);
}
