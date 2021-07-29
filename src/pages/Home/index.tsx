import { HeaderSmall } from 'src/styled/Texts';

import { ReactComponent as Arrow } from 'src/assets/svg/icons/Arrow.svg';
import { SeeMore } from 'src/styled/SeeMore';
import { useEffect, useState } from 'react';
import { findAllCourses } from 'src/services/course.service';
import { Course } from 'src/models/Course.model';
import CoursesList from 'src/components/CoursesList';
import CoursesListSkeleton from 'src/components/CoursesList/Skeleton';
import { useHistory } from 'react-router-dom';

import HomeSubscriptions from './HomeSubscriptions';

interface Props {}

const Home: React.FC<Props> = () => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [recentCourses, setRecentCourses] = useState([] as Course[]);

  useEffect(() => {
    async function fetchRecentCourses() {
      const { errorResponse, data } = await findAllCourses();

      if (!errorResponse && data) {
        setRecentCourses(data);
      }

      setIsLoading(false);
    }

    setTimeout(() => {
      fetchRecentCourses();
    }, 600);

    return () => {
      setIsLoading(true);
      setRecentCourses([] as Course[]);
    };
  }, []);

  return (
    <div className="main-padding">
      <HeaderSmall>Mais recentes</HeaderSmall>

      {!isLoading && <CoursesList courses={recentCourses} isColumn={false} />}
      {isLoading && <CoursesListSkeleton isColumn={false} />}

      <SeeMore onClick={() => history.push('/discover')}>
        <div className="see-more">
          <span>Ver Mais</span>
          <Arrow transform="rotate(270)" />
        </div>
      </SeeMore>

      <HomeSubscriptions />
    </div>
  );
};

export default Home;
