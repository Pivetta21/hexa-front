import formatDate from 'src/helpers/formatDate';
import { CourseRegistration } from 'src/models/CourseRegistration';
import { getImagePicture } from 'src/services/course.service';
import { ProgressCard } from 'src/styled/ProgressCard';
import { ProfileStatsListContainer } from './styles';

interface Props {
  courseRegisrationList: CourseRegistration[];
}

const ProfileStatsList: React.FC<Props> = ({ courseRegisrationList }) => {
  return (
    <ProfileStatsListContainer>
      <div className="heading">Seus Cursos</div>

      {courseRegisrationList.map((cr) => {
        return (
          <ProgressCard
            key={cr.course.id}
            to={`/discover/courses/${cr.course.id}`}
            title={cr.course.name}
          >
            <img src={getImagePicture(cr.course)} />
            <div>
              <h1>{cr.course.name}</h1>
              <span>Criado em {formatDate('pt-br', cr.course.created_at)}</span>
            </div>
          </ProgressCard>
        );
      })}
    </ProfileStatsListContainer>
  );
};

export default ProfileStatsList;
