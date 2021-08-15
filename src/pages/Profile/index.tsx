import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import formatDate from 'src/helpers/formatDate';
import { CourseRegistration } from 'src/models/CourseRegistration';
import AuthContext from 'src/providers/AuthContext';
import { findUserCourses } from 'src/services/courseRegistration.service';
import { getProfilePicture } from 'src/services/user.service';
import { ButtonPrimary } from 'src/styled/Buttons';
import ProfileStatsList from './ProfileStatsList';
import ProfileStatsListSkeleton from './ProfileStatsList/Skeleton';
import { ProfileContainer, ProfileInfo, ProfileStats } from './styles';

const Profile: React.FC = () => {
  const history = useHistory();
  const { authenticatedUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [courseRegistration, setCourseRegistration] = useState(
    {} as CourseRegistration[],
  );

  async function fetchCourses() {
    const { errorResponse, data } = await findUserCourses(
      authenticatedUser!.user.id,
      authenticatedUser!.token!,
    );

    if (!errorResponse && data) {
      setCourseRegistration(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    setTimeout(() => {
      fetchCourses();
    }, 600);
    return () => {
      setLoading(true);
    };
  }, []);

  return (
    <ProfileContainer className="main-padding">
      <ProfileInfo>
        <div>
          <img src={getProfilePicture(authenticatedUser?.user)} />
          <div>
            <h1>{authenticatedUser?.user.name}</h1>
            <p>{authenticatedUser?.user.email}</p>
          </div>
        </div>
        <ButtonPrimary
          type="button"
          onClick={() => history.push('/profile/config')}
        >
          Editar Perfil
        </ButtonPrimary>
        <span>
          Entrou em {formatDate('pt-br', authenticatedUser!.user.signUpDate)}
        </span>
      </ProfileInfo>

      <ProfileStats>
        {!loading && courseRegistration.length > 0 && (
          <ProfileStatsList courseRegisrationList={courseRegistration} />
        )}

        {(loading || courseRegistration.length == 0) && (
          <Fragment>
            <ProfileStatsListSkeleton />
            <ProfileStatsListSkeleton />
          </Fragment>
        )}
      </ProfileStats>
    </ProfileContainer>
  );
};

export default Profile;
