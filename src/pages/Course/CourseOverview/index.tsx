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
} from './styles';
import { getProfilePicture } from 'src/services/user.service';
import { useContext, useState } from 'react';
import CourseContext from 'src/providers/CourseContext';
import CourseOverviewList from './CourseOverviewList';
import CourseOverviewButton from './CourseOverviewButton';
import { StatsCards } from 'src/styled/StatsCards';
import {
  checkIfUserIsRegistered,
  getCourseRate,
  rateCourse,
} from 'src/services/courseRegistration.service';
import AuthContext from 'src/providers/AuthContext';
import { useEffect } from 'react';
import { ButtonLoader } from 'src/styled/Loaders';

const CourseOverview: React.FC = () => {
  const { course } = useContext(CourseContext);
  const { authenticatedUser, isUserLoggedIn } = useContext(AuthContext);

  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rate, setRate] = useState(0);

  async function handleRateCourse(userRate: number) {
    if (isUserLoggedIn && isRegistered) {
      rateCourse(
        {
          courseId: course.id,
          rate: userRate,
          userId: authenticatedUser!.user.id,
        },
        authenticatedUser!.token!,
      );
    }
  }

  async function fetchOverviewInfo() {
    if (isUserLoggedIn) {
      const { data } = await checkIfUserIsRegistered(
        { userId: authenticatedUser!.user!.id, courseId: course.id },
        authenticatedUser!.token!,
      );

      if (data == true) {
        setIsRegistered(true);
      }
    }

    const rateResponse = await getCourseRate(course.id);

    if (!rateResponse.errorResponse && rateResponse.data) {
      setRate(rateResponse.data.avg);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    setTimeout(() => {
      fetchOverviewInfo();
    }, 600);

    return () => {
      setIsLoading(true);
      setRate(0);
    };
  }, [authenticatedUser]);

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

            {!isLoading ? (
              <CourseHeaderRate>
                <Star
                  className={rate >= 1 ? 'active' : undefined}
                  onClick={() => handleRateCourse(1)}
                />
                <Star
                  className={rate >= 2 ? 'active' : undefined}
                  onClick={() => handleRateCourse(2)}
                />
                <Star
                  className={rate >= 3 ? 'active' : undefined}
                  onClick={() => handleRateCourse(3)}
                />
                <Star
                  className={rate >= 4 ? 'active' : undefined}
                  onClick={() => handleRateCourse(4)}
                />
                <Star
                  className={rate > 4.5 ? 'active' : undefined}
                  onClick={() => handleRateCourse(5)}
                />
              </CourseHeaderRate>
            ) : (
              <ButtonLoader />
            )}
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
            {!isLoading ? (
              <CourseOverviewButton
                course={course}
                isRegistered={isRegistered}
                setIsRegistered={setIsRegistered}
              />
            ) : (
              <ButtonLoader style={{ marginBottom: '12px' }} />
            )}

            <CourseOverviewText>Informações</CourseOverviewText>
            <StatsCards>
              <div>
                <p>Módulos</p>
                <span>{getModulesCount()}</span>
              </div>
              <div>
                <p>Vídeos</p>
                <span>{getVideosCount()}</span>
              </div>
            </StatsCards>

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
