import { useRef } from 'react';
import { Fragment, useEffect, useState } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import Loading from 'src/components/Loading';
import { Course } from 'src/models/Course.model';
import { ModuleI } from 'src/models/Module.model';
import { VideoI } from 'src/models/Video.model';
import { findCourse } from 'src/services/course.service';
import { getProfilePicture } from 'src/services/user.service';
import { ReactComponent as Arrow } from 'src/assets/svg/icons/Arrow.svg';

import { getVideoSrc } from 'src/services/video.service';
import {
  CourseInfoModule,
  CourseInfoModuleName,
  CourseInfoModuleNav,
  CourseInfoModuleVideos,
  CourseInfoName,
  CourseModuleContainer,
  CourseModuleInfo,
  CourseModuleVideo,
  CourseVideoDescription,
  CourseVideoDetails,
  CourseVideoGrid,
  CourseVideoInfo,
} from './styles';
import { SeeMore } from 'src/styled/SeeMore';
import { useContext } from 'react';
import AuthContext from 'src/providers/AuthContext';
import { checkIfUserIsRegistered } from 'src/services/courseRegistration.service';

interface Props {}

const CourseModule: React.FC<Props> = () => {
  const { id, moduleIndex } = useParams() as any;
  const videoIndex = new URLSearchParams(useLocation().search).get('video');

  const history = useHistory();
  const { authenticatedUser } = useContext(AuthContext);

  const videoRef = useRef(null);

  const [course, setCourse] = useState({} as Course);
  const [module, setModule] = useState({} as ModuleI);
  const [video, setVideo] = useState({} as VideoI);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchIsRegistered(courseId: number) {
    const { data } = await checkIfUserIsRegistered(
      { userId: authenticatedUser!.user!.id, courseId: courseId },
      authenticatedUser!.token!,
    );

    if (data == false) {
      history.goBack();
    }
  }

  function bootstrapVideo(module: ModuleI) {
    if (module.videos && Number(videoIndex) > 0) {
      setVideo(module.videos[Number(videoIndex) - 1]);

      if (videoRef.current) {
        const htmlVideo = videoRef.current as any;
        htmlVideo.load();
      }
    }
  }

  function bootstrapModule(course: Course) {
    if (course.modules && Number(moduleIndex) > 0) {
      const module = course.modules[Number(moduleIndex) - 1];

      setModule(module);

      bootstrapVideo(module);
    }
  }

  async function bootstrapCourse() {
    const { data, errorResponse } = await findCourse(id);

    if (!errorResponse && data) {
      setCourse(data);

      fetchIsRegistered(data.id);

      bootstrapModule(data);
    } else {
      history.goBack();
    }

    setIsLoading(false);
  }

  useEffect(() => {
    bootstrapCourse();

    return () => {
      setCourse({} as Course);
      setModule({} as ModuleI);
      setVideo({} as VideoI);
      setIsLoading(true);
    };
  }, []);

  useEffect(() => {
    bootstrapModule(course);
  }, [videoIndex, moduleIndex]);

  return (
    <Fragment>
      {!isLoading && video && (
        <CourseModuleContainer className="main-padding">
          <CourseModuleVideo controls ref={videoRef}>
            <source src={getVideoSrc(video)} />
          </CourseModuleVideo>

          <CourseVideoGrid>
            <CourseVideoInfo>
              <CourseVideoDetails>
                <img src={getProfilePicture(course.channel.user)} />

                <div>
                  <p>{course.channel.name}</p>
                  <h1>{video.name}</h1>
                </div>
              </CourseVideoDetails>

              <CourseVideoDescription>
                {video.description
                  ? video.description
                  : 'Esse vídeo não possui uma descrição!'}
              </CourseVideoDescription>

              <SeeMore>
                <div className="see-more">
                  <span>Ver Mais</span>
                  <Arrow transform="rotate(270)" />
                </div>
              </SeeMore>
            </CourseVideoInfo>

            <CourseModuleInfo>
              <CourseInfoName to={`/discover/courses/${course.id}`}>
                {course.name}
              </CourseInfoName>
              <hr />
              <CourseInfoModule>
                <CourseInfoModuleNav>
                  {course.modules!.length <= moduleIndex && (
                    <Link
                      className="marginR"
                      to={`/discover/courses/${course.id}/module/${Number(
                        moduleIndex - 1,
                      )}?video=1`}
                    >
                      <Arrow />
                    </Link>
                  )}
                  <span>Módulo {moduleIndex}</span>
                  {course.modules!.length > moduleIndex && (
                    <Link
                      className="marginL"
                      to={`/discover/courses/${course.id}/module/${
                        Number(moduleIndex) + 1
                      }?video=1`}
                    >
                      <Arrow transform="rotate(180)" />
                    </Link>
                  )}
                </CourseInfoModuleNav>
                <p>{module.videos?.length} vídeos</p>
              </CourseInfoModule>

              <CourseInfoModuleName>{module.name}</CourseInfoModuleName>

              <CourseInfoModuleVideos>
                {module.videos?.map((v, vIndex) => {
                  return (
                    <Link
                      to={`/discover/courses/${
                        course.id
                      }/module/${moduleIndex}?video=${vIndex + 1}`}
                      key={v.id}
                    >
                      {vIndex + 1}. {v.name}
                      <br />
                    </Link>
                  );
                })}
              </CourseInfoModuleVideos>
            </CourseModuleInfo>
          </CourseVideoGrid>
        </CourseModuleContainer>
      )}

      {isLoading && <Loading />}
    </Fragment>
  );
};

export default CourseModule;
