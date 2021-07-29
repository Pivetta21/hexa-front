import { HeaderSmall } from 'src/styled/Texts';

import { ReactComponent as Arrow } from 'src/assets/svg/icons/Arrow.svg';
import { SeeMore } from 'src/styled/SeeMore';
import { useEffect, useState } from 'react';
import { findAllCourses } from 'src/services/course.service';
import { Course } from 'src/models/Course.model';
import { ServiceResponse } from 'src/models/ServiceResponse.model';
import CoursesList from 'src/components/CoursesList';
import CoursesListSkeleton from 'src/components/CoursesList/Skeleton';
import { useHistory } from 'react-router-dom';

interface Props {}

const Home: React.FC<Props> = () => {
  const history = useHistory();

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
    <div className="main-padding">
      <HeaderSmall>Mais recentes</HeaderSmall>

      {!coursesResponse.errorResponse && coursesResponse.data && (
        <CoursesList courses={coursesResponse.data} isColumn={false} />
      )}
      {!coursesResponse.data && <CoursesListSkeleton isColumn={false} />}

      <SeeMore onClick={() => history.push('/discover')}>
        <div className="see-more">
          <span>Ver Mais</span>
          <Arrow transform="rotate(270)" />
        </div>
      </SeeMore>

      <HeaderSmall>Suas inscrições</HeaderSmall>

      {!coursesResponse.errorResponse && coursesResponse.data && (
        <CoursesList courses={coursesResponse.data} isColumn={false} />
      )}
      {!coursesResponse.data && <CoursesListSkeleton isColumn={false} />}

      <SeeMore
        style={{ marginBottom: '0px' }}
        onClick={() => history.push('/subscriptions')}
      >
        <div className="see-more">
          <span>Ver Mais</span>
          <Arrow transform="rotate(270)" />
        </div>
      </SeeMore>
    </div>
  );
};

export default Home;
