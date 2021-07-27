import api, { axiosFetch } from './api';

import noimage from 'src/assets/images/noimage.jpg';

import { Course, CreateCourse } from 'src/models/Course.model';
import { ServiceResponse } from 'src/models/ServiceResponse.model';

const url = '/courses';

export function findAllCourses() {}

export function findAllCoursesByChannelId() {}

export function findCourse() {}

export function createCourse(
  createChannel: CreateCourse,
  access_token: string,
): Promise<ServiceResponse<Course>> {
  const request = api.post(`${url}`, createChannel, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return axiosFetch<Course>(request);
}

export function updateCourse() {}

export function deleteCourse() {}

export function getImagePicture(course: Course) {
  if (course.image_url && course.image_url.length > 0) {
    return process.env.REACT_APP_SERVER_URL + '/' + course.image_url;
  }

  return noimage;
}

export function deleteImagePicture() {}

export function uploadImagePicture() {}
