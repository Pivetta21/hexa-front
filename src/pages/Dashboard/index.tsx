import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

import { ReactComponent as Cog } from 'src/assets/svg/icons/Cog.svg';

import { ButtonPrimary } from 'src/styled/Buttons';

import { Course } from 'src/models/Course.model';
import { findAllCoursesByChannelId } from 'src/services/course.service';

import DashboardCoursesList from './DashboardCoursesList';

import {
  DashboardButtons,
  DashboardContainer,
  DashboardHeader,
  DashboardTitle,
} from './styles';
import { DefaultInput } from 'src/styled/Inputs';

const Dashboard: React.FC = () => {
  const history = useHistory();

  const { channel } = useSelector((state: RootState) => state.channel);

  const [courses, setCourses] = useState([] as Course[]);
  const [filteredCourses, setFilteredCourses] = useState([] as Course[]);

  function findCourseByName(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;

    const filterValues = courses.filter((course) => {
      const courseName = course.name.trim().toLocaleLowerCase();

      return courseName.includes(value.trim().toLocaleLowerCase());
    });

    if (filterValues) setFilteredCourses(filterValues);
  }

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
        <DashboardTitle title="Link para visualizar a página do seu canal.">
          <Link to={`/discover/channels/${channel.id}`} target="_blank">
            Painel de Controle
          </Link>
        </DashboardTitle>
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
      {courses.length > 0 && (
        <DefaultInput style={{ marginTop: '4px', marginBottom: '0px' }}>
          <input
            type="text"
            onChange={(e) => findCourseByName(e)}
            placeholder="Buscar pelo nome do curso..."
          />
        </DefaultInput>
      )}
      <DashboardCoursesList
        coursesList={filteredCourses.length > 0 ? filteredCourses : courses}
      ></DashboardCoursesList>
    </DashboardContainer>
  );
};

export default Dashboard;
