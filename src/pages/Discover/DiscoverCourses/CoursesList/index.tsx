import { useHistory } from 'react-router-dom';
import { Course } from 'src/models/Course.model';
import { getImagePicture } from 'src/services/course.service';
import { getProfilePicture } from 'src/services/user.service';
import { ListBlock } from 'src/styled/Blocks';
import {
  CourseItemAuthor,
  CourseItemAuthorInfo,
  CourseItemContainer,
  CourseItemImage,
  CoursesListContainer,
} from 'src/styled/CoursesList';

interface Props {
  courses: Course[];
}

const CoursesList: React.FC<Props> = ({ courses }) => {
  const history = useHistory();

  return (
    <ListBlock>
      <CoursesListContainer>
        {courses.map((course) => {
          return (
            <CourseItemContainer
              key={course.id}
              onClick={() => history.push(`/discover/courses/${course.id}`)}
            >
              <CourseItemImage src={getImagePicture(course)} />
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
