import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import Loading from 'src/components/Loading';
import { Course } from 'src/models/Course.model';
import CourseDashboardContext from 'src/providers/CourseDashboardContext';
import { RootState } from 'src/redux/store';
import { findCourse } from 'src/services/course.service';
import { InternalLinksContainer, Section } from 'src/styled/Blocks';
import { Header, InternalLink } from 'src/styled/Texts';

import EditCourseGeneral from './EditCourseGeneral';
import EditCourseModules from './EditCourseModules';
import EditCourseOthers from './EditCourseOthers';

interface Props {}

const EditCourse: React.FC<Props> = () => {
  const { id } = useParams() as any;
  const { channel } = useSelector((state: RootState) => state.channel);

  const [course, setCourse] = useState({} as Course);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      const { data, errorResponse } = await findCourse(id);

      if (!errorResponse && data) {
        setCourse(data);
      }

      setIsLoading(false);
    }

    setTimeout(() => {
      fetchCourse();
    }, 400);

    return () => {
      setIsLoading(true);
    };
  }, []);

  return (
    <Fragment>
      {!isLoading && course.channel.id === channel.id && (
        <CourseDashboardContext.Provider
          value={{ course: course, setCourse: setCourse }}
        >
          <div className="main-padding">
            <Section>
              <Header>Editar Curso</Header>

              <InternalLinksContainer>
                <InternalLink
                  to={`/dashboard/course/${course.id}`}
                  activeClassName="active"
                  exact
                >
                  Geral
                </InternalLink>
                <InternalLink
                  to={`/dashboard/course/${course.id}/modules`}
                  activeClassName="active"
                >
                  Módulos
                </InternalLink>
                <InternalLink
                  to={`/dashboard/course/${course.id}/videos`}
                  activeClassName="active"
                >
                  Vídeos
                </InternalLink>
                <InternalLink
                  to={`/dashboard/course/${course.id}/others`}
                  activeClassName="active"
                >
                  Outros
                </InternalLink>
              </InternalLinksContainer>

              <Switch key="course-dashboard">
                <Route path={`/dashboard/course/${course.id}`} exact>
                  <EditCourseGeneral />
                </Route>
                <Route path={`/dashboard/course/${course.id}/modules`} exact>
                  <EditCourseModules />
                </Route>
                <Route path={`/dashboard/course/${course.id}/videos`} exact>
                  <div>Vídeos Component</div>
                </Route>
                <Route path={`/dashboard/course/${course.id}/others`} exact>
                  <EditCourseOthers />
                </Route>
              </Switch>
            </Section>
          </div>
        </CourseDashboardContext.Provider>
      )}
      {!isLoading && course.channel.id !== channel.id && <Redirect to="../" />}

      {isLoading && <Loading />}
    </Fragment>
  );
};

export default EditCourse;
