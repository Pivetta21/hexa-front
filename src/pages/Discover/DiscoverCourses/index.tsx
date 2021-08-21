import React, { Fragment, useState, useEffect } from 'react';

import { Course } from 'src/models/Course.model';
import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { findAllCourses } from 'src/services/course.service';

import CoursesList from 'src/components/CoursesList';
import CoursesListSkeleton from 'src/components/CoursesList/Skeleton';
import { DefaultInput } from 'src/styled/Inputs';

const DiscoverCourses: React.FC = () => {
  const [filteredCourses, setFilteredCourses] = useState([] as Course[]);
  const [coursesResponse, setCoursesResponse] = useState(
    {} as ServiceResponse<Course[]>,
  );

  function findCourseByName(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;

    const filterValues = coursesResponse.data?.filter((course) => {
      const courseName = course.name.trim().toLocaleLowerCase();

      return courseName.includes(value.trim().toLocaleLowerCase());
    });

    if (filterValues) setFilteredCourses(filterValues);
  }

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
        <Fragment>
          <DefaultInput>
            <input
              type="text"
              onChange={(e) => findCourseByName(e)}
              placeholder="Buscar um curso por nome..."
            />
          </DefaultInput>
          <CoursesList
            courses={
              filteredCourses.length > 0
                ? filteredCourses
                : coursesResponse.data
            }
          />
        </Fragment>
      )}

      {!coursesResponse.data && <CoursesListSkeleton />}
    </Fragment>
  );
};

export default DiscoverCourses;
