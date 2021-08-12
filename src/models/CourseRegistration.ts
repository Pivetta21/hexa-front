import { Course } from './Course.model';
import { User } from './User.model';

export interface CourseRegistration {
  id: number;
  user: User;
  course: Course;
  rate?: number;
  price: number;
  watched_videos: number;
  created_at: string;
  finished_at?: string;
}

export type RegisterCourseDto = {
  courseId: number;
  userId: number;
  price: number;
};
