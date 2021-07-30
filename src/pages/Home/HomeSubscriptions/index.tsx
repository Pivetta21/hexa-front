import { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CoursesList from 'src/components/CoursesList';
import CoursesListSkeleton from 'src/components/CoursesList/Skeleton';
import { Course } from 'src/models/Course.model';
import AuthContext from 'src/providers/AuthContext';
import { findAllUserFollowingCourses } from 'src/services/course.service';
import { SeeMore } from 'src/styled/SeeMore';
import { ReactComponent as Arrow } from 'src/assets/svg/icons/Arrow.svg';

import { HeaderSmall } from 'src/styled/Texts';
import { NoCourseCTA } from '../styles';

const HomeSubscriptions: React.FC = () => {
  const history = useHistory();
  const { authenticatedUser, isUserLoggedIn } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionsCourses, setSubscriptionsCourses] = useState(
    [] as Course[],
  );

  useEffect(() => {
    async function fetchSubscriptionsCourses() {
      if (authenticatedUser && authenticatedUser.token && isUserLoggedIn) {
        const serviceResponse = await findAllUserFollowingCourses(
          authenticatedUser.token,
        );

        if (!serviceResponse.errorResponse && serviceResponse.data) {
          setSubscriptionsCourses(serviceResponse.data);
        }
      }

      setIsLoading(false);
    }

    setTimeout(() => {
      fetchSubscriptionsCourses();
    }, 600);

    return () => {
      setIsLoading(true);
      setSubscriptionsCourses([] as Course[]);
    };
  }, [isUserLoggedIn]);

  return (
    <Fragment>
      <HeaderSmall>Suas inscrições</HeaderSmall>
      {!isLoading && subscriptionsCourses.length > 0 && (
        <CoursesList courses={subscriptionsCourses} isColumn={false} />
      )}
      {!isLoading && subscriptionsCourses.length == 0 && (
        <NoCourseCTA>
          {isUserLoggedIn ? (
            <span>Não tem publicações ainda ou não segue nenhum canal.</span>
          ) : (
            <span>Crie uma conta para poder seguir canais!</span>
          )}
        </NoCourseCTA>
      )}
      {isLoading && <CoursesListSkeleton isColumn={false} />}

      <SeeMore
        style={{ marginBottom: '0px' }}
        onClick={() => history.push('/subscriptions')}
      >
        <div className="see-more">
          <span>Ver Mais</span>
          <Arrow transform="rotate(270)" />
        </div>
      </SeeMore>
    </Fragment>
  );
};

export default HomeSubscriptions;
