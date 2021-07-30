import { Fragment, useState } from 'react';
import { useEffect } from 'react';

import CoursesList from 'src/components/CoursesList';
import CoursesListSkeleton from 'src/components/CoursesList/Skeleton';
import { Course } from 'src/models/Course.model';
import { findAllCoursesByChannelId } from 'src/services/course.service';

interface Props {
  channelId: number;
}

const ChannelHome: React.FC<Props> = ({ channelId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState({} as Course[]);

  useEffect(() => {
    async function fetchCourses() {
      const serviceResponse = await findAllCoursesByChannelId(channelId);

      if (!serviceResponse.errorResponse && serviceResponse.data) {
        setCourses(serviceResponse.data);
      }

      setIsLoading(false);
    }

    setTimeout(() => {
      fetchCourses();
    }, 600);

    return () => {
      setIsLoading(true);
      setCourses({} as Course[]);
    };
  }, []);

  return (
    <Fragment>
      {!isLoading && courses.length > 0 && <CoursesList courses={courses} />}
      {!isLoading && courses.length == 0 && (
        <div>Este canal ainda não publicou nenhum curso!</div>
      )}
      {isLoading && <CoursesListSkeleton />}
    </Fragment>
  );
};

export default ChannelHome;
