import api, { axiosFetch } from './api';

import noimage from 'src/assets/images/noimage.jpg';

import { Course, CreateCourse, UpdateCourse } from 'src/models/Course.model';
import { ServiceResponse } from 'src/models/ServiceResponse.model';
import {
  DeleteImageOptions,
  deleteImageWithParams,
  uploadImage,
} from './storage.service';

const url = '/courses';

export function findAllCourses() {
  const request = api.get(`${url}`);

  return axiosFetch<Course[]>(request);
}

export function findAllCoursesByChannelId(channelId: number) {
  const request = api.get(`${url}`, {
    params: { channelId: channelId },
  });

  return axiosFetch<Course[]>(request);
}

export function findCourse(channelId: number) {
  const request = api.get(`${url}/${channelId}`);

  return axiosFetch<Course>(request);
}

export function createCourse(
  createChannel: CreateCourse,
  access_token: string,
): Promise<ServiceResponse<Course>> {
  const request = api.post(`${url}`, createChannel, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return axiosFetch<Course>(request);
}

export function updateCourse(
  courseId: number,
  updateCourse: UpdateCourse,
  access_token: string,
): Promise<ServiceResponse<Course>> {
  const request = api.patch(`${url}/${courseId}`, updateCourse, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return axiosFetch<Course>(request);
}

export function deleteCourse(
  args: {
    courseId: number;
    channelId: number;
  },
  access_token: string,
): Promise<ServiceResponse<any>> {
  const request = api.delete(`${url}/${args.courseId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
    params: { channelId: args.channelId },
  });

  return axiosFetch<any>(request);
}

export function getImagePicture(course: Course) {
  if (course.image_url && course.image_url.length > 0) {
    return process.env.REACT_APP_SERVER_URL + '/' + course.image_url;
  }

  return noimage;
}

export function deleteImagePicture(course: Course, access_token: string) {
  const filePath = course.image_url;
  if (filePath && filePath.length > 0) {
    deleteImageWithParams(
      access_token,
      DeleteImageOptions.COURSE_IMAGE,
      filePath,
      { params: { courseId: course.id } },
    );
  }
}

export async function uploadImagePicture(
  courseId: number,
  file: File,
  access_token: string,
): Promise<ServiceResponse<Course>> {
  let serviceResponse = {} as ServiceResponse<Course>;

  const uploadImageResponse = await uploadImage(access_token, file);

  if (uploadImageResponse.data) {
    serviceResponse = await updateCourse(
      courseId,
      {
        image_url: uploadImageResponse.data.path,
      },
      access_token,
    );
  } else {
    serviceResponse.errorResponse = uploadImageResponse.errorResponse;
  }

  return serviceResponse;
}
