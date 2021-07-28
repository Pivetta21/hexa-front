import { Fragment } from 'react';
import DeleteCourse from './DeleteCourse';

interface Props {}

const EditCourseOthers: React.FC<Props> = () => {
  return (
    <Fragment>
      <DeleteCourse />
    </Fragment>
  );
};

export default EditCourseOthers;
