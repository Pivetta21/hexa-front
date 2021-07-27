import { useHistory } from 'react-router-dom';

import { ReactComponent as Cog } from 'src/assets/svg/icons/Cog.svg';
import { ButtonPrimary } from 'src/styled/Buttons';

import {
  DashboardButtons,
  DashboardContainer,
  DashboardHeader,
  DashboardTitle,
} from './styles';

const Dashboard: React.FC = () => {
  const history = useHistory();

  return (
    <DashboardContainer className="main-padding">
      <DashboardHeader>
        <DashboardTitle>Painel de Controle</DashboardTitle>
        <DashboardButtons>
          <Cog onClick={() => history.push('/dashboard/edit-channel')} />
          <ButtonPrimary
            type="button"
            onClick={() => history.push('/dashboard/create-course')}
          >
            Novo Curso
          </ButtonPrimary>
        </DashboardButtons>
      </DashboardHeader>
    </DashboardContainer>
  );
};

export default Dashboard;
