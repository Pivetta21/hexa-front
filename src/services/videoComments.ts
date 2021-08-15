import { CreateVideoComment } from './../models/VideoComment.model';
import api, { axiosFetch } from './api';

import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { VideoComment } from 'src/models/VideoComment.model';

const url = '/video-comments';

export function findVideoComments(
  videoId: number,
): Promise<ServiceResponse<VideoComment[]>> {
  const request = api.get(`${url}`, { params: { videoId: videoId } });

  return axiosFetch<VideoComment[]>(request);
}

export function createVideoComments(
  newVideoComment: CreateVideoComment,
  access_token: string,
): Promise<ServiceResponse<VideoComment>> {
  const body = {
    video: { id: newVideoComment.videoId },
    user: newVideoComment.userId,
    text: newVideoComment.text,
  };

  const request = api.post(`${url}`, body, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return axiosFetch<VideoComment>(request);
}

export function deleteComment(
  commentId: number,
  access_token: string,
): Promise<ServiceResponse<any>> {
  const request = api.delete(`${url}/${commentId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return axiosFetch<any>(request);
}
