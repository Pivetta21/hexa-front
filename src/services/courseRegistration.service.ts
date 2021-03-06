import {
  CourseRegistration,
  RateCourseDto,
  RegisterCourseDto,
} from './../models/CourseRegistration';
import { ServiceResponse } from 'src/models/ServiceResponse.model';
import api, { axiosFetch } from './api';

const url = 'course-registration';

export function registerToCourse(
  courseRegistration: RegisterCourseDto,
  access_token: string,
): Promise<ServiceResponse<CourseRegistration>> {
  const request = api.post(
    `${url}/register`,
    { ...courseRegistration },
    {
      headers: { Authorization: `Bearer ${access_token}` },
    },
  );

  return axiosFetch<CourseRegistration>(request);
}

export function checkIfUserIsRegistered(
  arg: {
    userId: number;
    courseId: number;
  },
  access_token: string,
): Promise<ServiceResponse<boolean>> {
  const request = api.get(`${url}/is-registered`, {
    params: { userId: arg.userId, courseId: arg.courseId },
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return axiosFetch<boolean>(request);
}

export function findUserCourses(
  userId: number,
  access_token: string,
): Promise<ServiceResponse<CourseRegistration[]>> {
  const request = api.get(`${url}/courses/${userId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return axiosFetch<CourseRegistration[]>(request);
}

export function getCourseRate(
  courseId: number,
): Promise<ServiceResponse<{ avg: number }>> {
  const request = api.get(`${url}/rate/${courseId}`);

  return axiosFetch<{ avg: number }>(request);
}

export function rateCourse(
  rateCourse: RateCourseDto,
  access_token: string,
): Promise<ServiceResponse<CourseRegistration>> {
  const request = api.post(`${url}/rate`, rateCourse, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return axiosFetch<CourseRegistration>(request);
}
