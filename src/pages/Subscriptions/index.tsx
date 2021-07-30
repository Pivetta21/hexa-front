import { useContext, useEffect, useState } from 'react';
import CoursesList from 'src/components/CoursesList';
import CoursesListSkeleton from 'src/components/CoursesList/Skeleton';
import { Course } from 'src/models/Course.model';
import AuthContext from 'src/providers/AuthContext';
import { findAllUserFollowingCourses } from 'src/services/course.service';
import { Header } from 'src/styled/Texts';

interface Props {}

const Subscriptions: React.FC<Props> = () => {
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
  }, []);

  return (
    <div className="main-padding">
      <Header>Subscriptions</Header>
      {!isLoading && subscriptionsCourses.length > 0 && (
        <CoursesList courses={subscriptionsCourses} />
      )}

      {!isLoading && subscriptionsCourses.length == 0 && (
        <div>Não tem publicações ainda ou não segue nenhum canal.</div>
      )}
      {isLoading && <CoursesListSkeleton />}
    </div>
  );
};

export default Subscriptions;
