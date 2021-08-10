import { Course } from './Course.model';
import { VideoI } from './Video.model';

export interface ModuleI {
  id: number;
  course: Course;
  name: string;
  videos?: VideoI[];
}

export interface CreateModuleI {
  course: Course;
  name: string;
}

export interface UpdateModuleI {
  name: string;
}
