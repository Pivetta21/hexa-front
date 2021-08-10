import { Course } from 'src/models/Course.model';

import {
  CourseOverviewListContainer,
  OverviewListHeader,
  OverviewListUl,
} from './styles';

import { ReactComponent as Arrow } from 'src/assets/svg/icons/Arrow.svg';

interface Props {
  course: Course;
}

const CourseOverviewList: React.FC<Props> = ({ course }) => {
  function toggleModule(e: any) {
    const div = e.target as HTMLDivElement;

    div.nextElementSibling!.classList.toggle('show');
    div.lastElementChild!.classList.toggle('open');
  }

  return (
    <CourseOverviewListContainer>
      {course.modules?.map((module, mIndex) => {
        return (
          <div key={module.id}>
            <OverviewListHeader onClick={(e) => toggleModule(e)}>
              {mIndex + 1}. {module.name}
              <Arrow className={mIndex == 0 ? 'open' : undefined} />
            </OverviewListHeader>
            <OverviewListUl className={mIndex == 0 ? 'show' : undefined}>
              {module.videos?.map((video, vIndex) => (
                <li key={video.id}>
                  {vIndex + 1}. {video.name}
                </li>
              ))}
            </OverviewListUl>
          </div>
        );
      })}
    </CourseOverviewListContainer>
  );
};

export default CourseOverviewList;
