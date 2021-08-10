import { Course } from './../models/Course.model';
import { createContext } from 'react';

interface CourseContextType {
  course: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
}

const CourseContext = createContext<CourseContextType>({} as CourseContextType);

export default CourseContext;
