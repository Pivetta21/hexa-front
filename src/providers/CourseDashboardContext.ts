import { Course } from './../models/Course.model';
import { createContext } from 'react';

interface CourseDashboardContextType {
  course: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
}

const CourseDashboardContext = createContext<CourseDashboardContextType>(
  {} as CourseDashboardContextType,
);

export default CourseDashboardContext;
