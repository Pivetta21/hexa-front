import { ListBlock } from 'src/styled/Blocks';
import {
  CourseItemAuthorInfoSk,
  CourseItemAuthorSk,
  CourseItemContainerSk,
  CourseItemImageSk,
  CoursesListContainerSk,
} from './styles';

interface Props {
  isColumn?: boolean;
}

const CoursesListSkeleton: React.FC<Props> = ({ isColumn = true }) => {
  const courses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  return (
    <ListBlock>
      <CoursesListContainerSk className={isColumn ? 'column' : 'row'}>
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
