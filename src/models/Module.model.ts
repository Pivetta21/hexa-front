import { Course } from './Course.model';

export interface ModuleI {
  id: number;
  course: Course;
  name: string;
}

export interface CreateModuleI {
  course: Course;
  name: string;
}

export interface UpdateModuleI {
  name: string;
}
