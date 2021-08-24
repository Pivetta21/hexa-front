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
  CourseInfoNextModule,
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
import VideoComments from './VideoComments';

interface Props {}

const CourseModule: React.FC<Props> = () => {
  const { id, moduleIndex } = useParams() as any;
  const videoIndex = new URLSearchParams(useLocation().search).get('video');

  const descriptionRef = useRef(null);

  const history = useHistory();
  const { authenticatedUser } = useContext(AuthContext);

  const videoRef = useRef(null);

  const [course, setCourse] = useState({} as Course);
  const [module, setModule] = useState({} as ModuleI);
  const [video, setVideo] = useState({} as VideoI);
  const [isLoading, setIsLoading] = useState(true);

  function toggleDescriptionDiv() {
    const div = descriptionRef!.current! as HTMLDivElement;

    div.classList.toggle('h-100');
  }

  async function fetchIsRegistered(course: Course) {
    if (authenticatedUser!.user!.id != course.channel.user.id) {
      const { data } = await checkIfUserIsRegistered(
        { userId: authenticatedUser!.user!.id, courseId: course.id },
        authenticatedUser!.token!,
      );

      if (data == false) {
        history.goBack();
      }
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

      fetchIsRegistered(data);

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
                <img
                  onClick={() =>
                    history.push(`/discover/channels/${course.channel.id}`)
                  }
                  src={getProfilePicture(course.channel.user)}
                />

                <div>
                  <p>{course.channel.name}</p>
                  <h1>{video.name}</h1>
                </div>
              </CourseVideoDetails>

              <CourseVideoDescription ref={descriptionRef}>
                {video.description
                  ? video.description
                  : 'Esse vídeo não possui uma descrição!'}
              </CourseVideoDescription>

              <SeeMore onClick={() => toggleDescriptionDiv()}>
                <div className="see-more">
                  <span>Ver Mais</span>
                  <Arrow transform="rotate(270)" />
                </div>
              </SeeMore>

              <span className="comments">
                <VideoComments videoId={video.id} />
              </span>
            </CourseVideoInfo>

            <div>
              <CourseModuleInfo>
                <CourseInfoName to={`/discover/courses/${course.id}`}>
                  {course.name}
                </CourseInfoName>
                <hr />
                <CourseInfoModule>
                  <CourseInfoModuleNav>
                    {moduleIndex - 1 > 0 && (
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
                        className={v.id == video.id ? 'active' : undefined}
                      >
                        {vIndex + 1}. {v.name}
                      </Link>
                    );
                  })}
                  <Fragment>
                    {course.modules && course.modules.length != moduleIndex && (
                      <CourseInfoNextModule>
                        <h1>PRÓXIMO MÓDULO</h1>
                        <div>
                          <h2>{course.modules[moduleIndex]!.name}</h2>
                          <p>
                            {course.modules[moduleIndex].videos
                              ? course.modules[moduleIndex].videos!.length
                              : 0}
                            <span> vídeos</span>
                          </p>
                        </div>
                      </CourseInfoNextModule>
                    )}
                  </Fragment>
                </CourseInfoModuleVideos>
              </CourseModuleInfo>
            </div>
          </CourseVideoGrid>
        </CourseModuleContainer>
      )}

      {isLoading && <Loading />}
    </Fragment>
  );
};

export default CourseModule;
