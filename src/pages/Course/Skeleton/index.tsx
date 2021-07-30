import {
  CoursePageContainerSk,
  CoursePageHeaderSk,
  CourseHeaderImageSk,
  CourseHeaderRateSk,
  CourseHeaderInfoSk,
} from './styles';

interface Props {}

const CoursePageSkeleton: React.FC<Props> = () => {
  return (
    <CoursePageContainerSk>
      <CoursePageHeaderSk>
        <CourseHeaderImageSk />
        <CourseHeaderInfoSk>
          <h1></h1>
          <h1></h1>
          <CourseHeaderRateSk />
        </CourseHeaderInfoSk>
      </CoursePageHeaderSk>
    </CoursePageContainerSk>
  );
};

export default CoursePageSkeleton;
