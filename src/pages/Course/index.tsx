import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Course } from 'src/models/Course.model';
import { findCourse, getImagePicture } from 'src/services/course.service';
import CoursePageSkeleton from './Skeleton';

import { ReactComponent as Star } from 'src/assets/svg/icons/Star.svg';

import {
  CourseHeaderImage,
  CourseHeaderInfo,
  CourseHeaderRate,
  CoursePageContainer,
  CoursePageDetails,
  CoursePageDetailsContent,
  CoursePageDetailsInfo,
  CoursePageHeader,
} from './styles';

interface Props {}

const CoursePage: React.FC<Props> = () => {
  const { id } = useParams() as any;

  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState({} as Course);

  useEffect(() => {
    async function fetchCouse() {
      const { data, errorResponse } = await findCourse(id);

      if (!errorResponse && data) {
        setCourse(data);
      }

      setIsLoading(false);
    }

    setTimeout(() => {
      fetchCouse();
    }, 600);

    return () => {
      setIsLoading(true);
      setCourse({} as Course);
    };
  }, []);

  return (
    <div className="main-padding">
      {!isLoading && (
        <CoursePageContainer>
          <CoursePageHeader>
            <CourseHeaderImage src={getImagePicture(course)} />
            <CourseHeaderInfo>
              <h1>{course.name}</h1>

              <CourseHeaderRate>
                <Star className="active" />
                <Star className="active" />
                <Star className="active" />
                <Star className="active" />
                <Star />
              </CourseHeaderRate>
            </CourseHeaderInfo>
          </CoursePageHeader>

          <CoursePageDetails>
            <CoursePageDetailsContent></CoursePageDetailsContent>
            <CoursePageDetailsInfo></CoursePageDetailsInfo>
          </CoursePageDetails>
        </CoursePageContainer>
      )}
      {isLoading && <CoursePageSkeleton />}
    </div>
  );
};

export default CoursePage;
