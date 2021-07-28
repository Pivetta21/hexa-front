import { Course } from 'src/models/Course.model';
import { getImagePicture } from 'src/services/course.service';

import { ReactComponent as Cog } from 'src/assets/svg/icons/Cog.svg';
import { ReactComponent as Eye } from 'src/assets/svg/icons/Eye.svg';

import {
  DashboardCoursesListContainer,
  DashboardCoursesListInfo,
  DashboardCoursesListItem,
  DashboardCoursesListOption,
  DashboardCoursesListOptions,
} from './styles';
import { useHistory } from 'react-router-dom';

interface Props {
  coursesList: Course[];
}

const DashboardCoursesList: React.FC<Props> = ({ coursesList }) => {
  const history = useHistory();

  return (
    <DashboardCoursesListContainer>
      {coursesList.length == 0 && <div>Não possui nenhum curso!</div>}

      {coursesList.map((course) => {
        return (
          <DashboardCoursesListItem key={course.id}>
            <img src={getImagePicture(course)} aria-label={course.name} />
            <DashboardCoursesListInfo>
              <h1>{course.name}</h1>
              <p>
                {course.description
                  ? course.description
                  : 'Este curso ainda não possui uma descrição.'}
              </p>
              <DashboardCoursesListOptions className="course-options">
                <DashboardCoursesListOption
                  onClick={() => history.push(`/dashboard/course/${course.id}`)}
                >
                  <Cog />
                  Editar Curso
                </DashboardCoursesListOption>
                <DashboardCoursesListOption
                  onClick={() => history.push(`/discover/courses/${course.id}`)}
                >
                  <Eye />
                  Visualizar Curso
                </DashboardCoursesListOption>
              </DashboardCoursesListOptions>
            </DashboardCoursesListInfo>
          </DashboardCoursesListItem>
        );
      })}
    </DashboardCoursesListContainer>
  );
};

export default DashboardCoursesList;
