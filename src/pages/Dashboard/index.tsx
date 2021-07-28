import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ReactComponent as Cog } from 'src/assets/svg/icons/Cog.svg';
import { Course } from 'src/models/Course.model';
import { RootState } from 'src/redux/store';
import { findAllCoursesByChannelId } from 'src/services/course.service';
import { ButtonPrimary } from 'src/styled/Buttons';
import DashboardCoursesList from './CoursesList';

import {
  DashboardButtons,
  DashboardContainer,
  DashboardHeader,
  DashboardTitle,
} from './styles';

const Dashboard: React.FC = () => {
  const history = useHistory();

  const { channel } = useSelector((state: RootState) => state.channel);

  const [courses, setCourses] = useState([] as Course[]);

  async function handleFetchCourses() {
    const serviceResponse = await findAllCoursesByChannelId(channel.id);

    if (!serviceResponse.errorResponse && serviceResponse.data) {
      setCourses(serviceResponse.data);
    }
  }
  useEffect(() => {
    handleFetchCourses();
  }, []);

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
      <DashboardCoursesList coursesList={courses}></DashboardCoursesList>
    </DashboardContainer>
  );
};

export default Dashboard;
