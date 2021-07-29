import { ListBlock } from 'src/styled/Blocks';
import {
  CourseItemAuthorInfoSk,
  CourseItemAuthorSk,
  CourseItemContainerSk,
  CourseItemImageSk,
  CoursesListContainerSk,
} from './styles';

interface Props {}

const CoursesListSkeleton: React.FC<Props> = () => {
  const courses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  return (
    <ListBlock>
      <CoursesListContainerSk>
        {courses.map((course) => {
          return (
            <CourseItemContainerSk key={course}>
              <CourseItemImageSk />
              <CourseItemAuthorSk>
                <div className="img"></div>
                <CourseItemAuthorInfoSk>
                  <h1></h1>
                  <p></p>
                </CourseItemAuthorInfoSk>
              </CourseItemAuthorSk>
            </CourseItemContainerSk>
          );
        })}
      </CoursesListContainerSk>
    </ListBlock>
  );
};

export default CoursesListSkeleton;
