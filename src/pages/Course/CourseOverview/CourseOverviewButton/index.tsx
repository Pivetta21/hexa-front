import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Course } from 'src/models/Course.model';
import AuthContext from 'src/providers/AuthContext';
import { registerToCourse } from 'src/services/courseRegistration.service';
import { ButtonPrimary } from 'src/styled/Buttons';

interface Props {
  course: Course;
  isRegistered: boolean;
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
}

const CourseOverviewButton: React.FC<Props> = ({
  course,
  isRegistered,
  setIsRegistered,
}) => {
  const { isUserLoggedIn, authenticatedUser } = useContext(AuthContext);

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

  return (
    <Fragment>
      {isUserLoggedIn && isRegistered && (
        <Link to={`/discover/courses/${course.id}/module/1?video=1`}>
          <ButtonPrimary>ASSISTIR</ButtonPrimary>
        </Link>
      )}

      {isUserLoggedIn &&
        !isRegistered &&
        authenticatedUser?.user.id != course.channel.user.id && (
          <ButtonPrimary onClick={() => handleRegisterToCourse()}>
            REGISTRAR-SE
          </ButtonPrimary>
        )}

      {(!isUserLoggedIn ||
        authenticatedUser?.user.id == course.channel.user.id) && (
        <ButtonPrimary disabled>REGISTRAR-SE</ButtonPrimary>
      )}
    </Fragment>
  );
};

export default CourseOverviewButton;
