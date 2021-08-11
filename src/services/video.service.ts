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

export function removeVideo(
  videoId: number,
  access_token: string,
): Promise<ServiceResponse<boolean>> {
  const request = api.delete(`${url}/${videoId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return axiosFetch<boolean>(request);
}

export function getVideoSrc(video: VideoI) {
  return (
    process.env.REACT_APP_SERVER_URL + '/storage/videos/' + video.video_url
  );
}
