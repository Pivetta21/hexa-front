import { useHistory } from 'react-router-dom';
import { Course } from 'src/models/Course.model';
import { getImagePicture } from 'src/services/course.service';
import { getProfilePicture } from 'src/services/user.service';
import { ListBlock } from 'src/styled/Blocks';
import {
  CourseItemAuthor,
  CourseItemAuthorInfo,
  CourseItemBadges,
  CourseItemContainer,
  CourseItemImage,
  CoursesListContainer,
} from './styles';

interface Props {
  courses: Course[];
  isColumn?: boolean;
}

const CoursesList: React.FC<Props> = ({ courses, isColumn = true }) => {
  const history = useHistory();

  return (
    <ListBlock>
      <CoursesListContainer className={isColumn ? 'column' : 'row'}>
        {courses.map((course) => {
          return (
            <CourseItemContainer
              key={course.id}
              onClick={() => history.push(`/discover/courses/${course.id}`)}
            >
              <CourseItemImage src={getImagePicture(course)} />
              <CourseItemBadges>
                <span>{course.price > 0 ? `Conteúdo Pago` : 'Gratuito'}</span>
              </CourseItemBadges>
              <CourseItemAuthor>
                <img src={getProfilePicture(course.channel.user)} />
                <CourseItemAuthorInfo>
                  <h1>{course.name}</h1>
                  <p>{course.channel.user.name}</p>
                </CourseItemAuthorInfo>
              </CourseItemAuthor>
            </CourseItemContainer>
          );
        })}
      </CoursesListContainer>
    </ListBlock>
  );
};

export default CoursesList;
