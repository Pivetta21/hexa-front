import { useEffect } from 'react';
import { useState } from 'react';
import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Course } from 'src/models/Course.model';
import AuthContext from 'src/providers/AuthContext';
import {
  checkIfUserIsRegistered,
  registerToCourse,
} from 'src/services/courseRegistration.service';
import { ButtonPrimary } from 'src/styled/Buttons';

interface Props {
  course: Course;
}

const CourseOverviewButton: React.FC<Props> = ({ course }) => {
  const { isUserLoggedIn, authenticatedUser } = useContext(AuthContext);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function handleRegisterToCourse() {
    const serviceResponse = await registerToCourse(
      {
        userId: authenticatedUser!.user!.id,
        courseId: course.id,
        price: course.price,
      },
      authenticatedUser!.token!,
    );

    if (serviceResponse.data) {
      setIsRegistered(true);
    }
  }

  async function fetchIsRegistered() {
    if (isUserLoggedIn) {
      const { data } = await checkIfUserIsRegistered(
        { userId: authenticatedUser!.user!.id, courseId: course.id },
        authenticatedUser!.token!,
      );

      if (data == true) {
        setIsRegistered(true);
      }
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchIsRegistered();

    return () => {
      setIsLoading(true);
    };
  }, []);

  return (
    <Fragment>
      {isUserLoggedIn && isRegistered && !isLoading && (
        <Link to={`/discover/courses/${course.id}/module/1?video=1`}>
          <ButtonPrimary>ASSISTIR</ButtonPrimary>
        </Link>
      )}

      {isUserLoggedIn &&
        !isRegistered &&
        !isLoading &&
        authenticatedUser?.user.id != course.channel.user.id && (
          <ButtonPrimary onClick={() => handleRegisterToCourse()}>
            REGISTRAR-SE
          </ButtonPrimary>
        )}

      {(!isUserLoggedIn ||
        authenticatedUser?.user.id == course.channel.user.id) &&
        !isLoading && <ButtonPrimary disabled>REGISTRAR-SE</ButtonPrimary>}
    </Fragment>
  );
};

export default CourseOverviewButton;
