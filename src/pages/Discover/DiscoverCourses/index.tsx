import { Fragment, useState, useEffect } from 'react';

import { Course } from 'src/models/Course.model';
import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { findAllCourses } from 'src/services/course.service';

import CoursesList from 'src/pages/Discover/DiscoverCourses/CoursesList';
import CoursesListSkeleton from 'src/pages/Discover/DiscoverCourses/CoursesList/Skeleton';

const DiscoverCourses: React.FC = () => {
  const [coursesResponse, setCoursesResponse] = useState(
    {} as ServiceResponse<Course[]>,
  );

  useEffect(() => {
    async function fetchCourses() {
      const serviceResponse = await findAllCourses();

      setCoursesResponse(serviceResponse);
    }

    setTimeout(() => {
      fetchCourses();
    }, 1000);
  }, []);
  return (
    <Fragment>
      {!coursesResponse.errorResponse && coursesResponse.data && (
        <CoursesList courses={coursesResponse.data} />
      )}

      {!coursesResponse.data && <CoursesListSkeleton />}
    </Fragment>
  );
};

export default DiscoverCourses;
