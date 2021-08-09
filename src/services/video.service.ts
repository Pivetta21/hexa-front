import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { CreateVideoI, UpdateVideoI, VideoI } from 'src/models/Video.model';
import api, { axiosFetch } from './api';

const url: string = '/videos';

export function findVideosByModuleId(
  moduleId: number,
): Promise<ServiceResponse<VideoI[]>> {
  const request = api.get(`${url}`, {
    params: {
      moduleId: moduleId,
    },
  });

  return axiosFetch<VideoI[]>(request);
}

export function createVideo(
  createVideoDto: CreateVideoI,
  access_token: string,
): Promise<ServiceResponse<VideoI>> {
  const request = api.post(`${url}`, createVideoDto, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return axiosFetch<VideoI>(request);
}

export function updateVideo(
  videoId: number,
  updateVideo: UpdateVideoI,
  access_token: string,
): Promise<ServiceResponse<VideoI>> {
  const request = api.patch(`${url}/${videoId}`, updateVideo, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return axiosFetch<VideoI>(request);
}

// http://127.0.0.1:8080/storage/videos/3/8/11/video1.mp4
