import { Link } from 'react-router-dom';
import { getImagePicture } from 'src/services/course.service';

import { ReactComponent as Star } from 'src/assets/svg/icons/Star.svg';

import {
  CourseHeaderImage,
  CourseHeaderInfo,
  CourseHeaderRate,
  CourseOverviewContainer,
  CourseOverviewDetails,
  CourseOverviewInfo,
  CourseOverviewHeader,
  CourseOverviewDetailsContent,
  CourseOverviewText,
  CourseOverviewCreator,
  CourseOverviewStats,
} from './styles';
import { ButtonPrimary } from 'src/styled/Buttons';
import { getProfilePicture } from 'src/services/user.service';
import { useContext } from 'react';
import CourseContext from 'src/providers/CourseContext';
import CourseOverviewList from './CourseOverviewList';

const CourseOverview: React.FC = () => {
  const { course } = useContext(CourseContext);

  function getModulesCount(): string {
    const modules = course.modules;

    if (!modules || modules.length == 0) {
      return '00';
    }

    if (modules.length < 10) {
      return `0${modules.length}`;
    }

    return `${modules.length}`;
  }

  function getVideosCount(): string {
    const modules = course.modules;

    if (!modules || modules.length == 0) {
      return '00';
    }

    let total = 0;
    for (const module of modules) {
      total += module.videos ? module.videos.length : 0;
    }

    if (total < 10) {
      return `0${total}`;
    }

    return `${total}`;
  }

  return (
    <CourseOverviewContainer className="main-padding">
      <div>
        <CourseOverviewHeader>
          <CourseHeaderImage src={getImagePicture(course)} />
          <CourseHeaderInfo>
            <h1>{course.name}</h1>

            <CourseHeaderRate>
              <Star className="active" />
              <Star className="active" />
              <Star className="active" />
              <Star className="active" />
              <Star />
            </CourseHeaderRate>
          </CourseHeaderInfo>
        </CourseOverviewHeader>

        <CourseOverviewDetails>
          <CourseOverviewDetailsContent>
            <CourseOverviewText>Descrição</CourseOverviewText>
            <p>
              {course.description
                ? course.description
                : 'Não possui uma descrição ainda!'}
            </p>
            <CourseOverviewText>Conteúdo</CourseOverviewText>

            <CourseOverviewList course={course} />
          </CourseOverviewDetailsContent>

          <CourseOverviewInfo>
            <ButtonPrimary>Continuar Assistindo</ButtonPrimary>

            <CourseOverviewText>Informações</CourseOverviewText>
            <CourseOverviewStats>
              <div>
                <p>Módulos</p>
                <span>{getModulesCount()}</span>
              </div>
              <div>
                <p>Vídeos</p>
                <span>{getVideosCount()}</span>
              </div>
            </CourseOverviewStats>

            <CourseOverviewCreator>
              <CourseOverviewText>Criador</CourseOverviewText>
              <Link to={`/discover/channels/${course.channel.id}`}>
                <img src={getProfilePicture(course.channel.user)} />
                <div>
                  <p>{course.channel.name}</p>
                  <span>{course.channel.user.name}</span>
                </div>
              </Link>
            </CourseOverviewCreator>
          </CourseOverviewInfo>
        </CourseOverviewDetails>
      </div>
    </CourseOverviewContainer>
  );
};

export default CourseOverview;
