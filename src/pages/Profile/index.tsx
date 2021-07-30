import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import formatDate from 'src/helpers/formatDate';
import AuthContext from 'src/providers/AuthContext';
import { getProfilePicture } from 'src/services/user.service';
import { ButtonPrimary } from 'src/styled/Buttons';
import ProfileStatsListSkeleton from './ProfileStatsList/Skeleton';
import { ProfileContainer, ProfileInfo, ProfileStats } from './styles';

const Profile: React.FC = () => {
  const history = useHistory();
  const { authenticatedUser } = useContext(AuthContext);

  return (
    <ProfileContainer className="main-padding">
      <ProfileInfo>
        <img src={getProfilePicture(authenticatedUser?.user)} />
        <h1>{authenticatedUser?.user.name}</h1>
        <p>{authenticatedUser?.user.email}</p>
        <ButtonPrimary
          type="button"
          onClick={() => history.push('/profile/config')}
        >
          Editar Perfil
        </ButtonPrimary>
        <div>
          Entrou em {formatDate('pt-br', authenticatedUser!.user.signUpDate)}
        </div>
      </ProfileInfo>

      <ProfileStats>
        <ProfileStatsListSkeleton />
        <ProfileStatsListSkeleton />
      </ProfileStats>
    </ProfileContainer>
  );
};

export default Profile;
