import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { findCourse } from 'src/services/course.service';
import { Course } from 'src/models/Course.model';

import Loading from 'src/components/Loading';

import CourseOverview from './CourseOverview';
import CourseContext from 'src/providers/CourseContext';

const CoursePage: React.FC = () => {
  const { id } = useParams() as any;

  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState({} as Course);

  useEffect(() => {
    async function fetchCourse() {
      const { data, errorResponse } = await findCourse(id);

      if (!errorResponse && data) {
        setCourse(data);
      }

      setIsLoading(false);
    }

    setTimeout(() => {
      fetchCourse();
    }, 600);

    return () => {
      setIsLoading(true);
      setCourse({} as Course);
    };
  }, []);

  return (
    <CourseContext.Provider value={{ course, setCourse }}>
      {!isLoading && <CourseOverview />}
      {isLoading && <Loading />}
    </CourseContext.Provider>
  );
};

export default CoursePage;
