import { ProfileStatsSection, ProfileStatsSectionGrid } from './styles';

interface Props {}

const ProfileStatsListSkeleton: React.FC<Props> = () => {
  return (
    <ProfileStatsSection>
      <h1></h1>
      <ProfileStatsSectionGrid>
        <div>
          <div className="progress">
            <div></div>
          </div>
        </div>
        <div>
          <div className="progress">
            <div></div>
          </div>
        </div>
        <div>
          <div className="progress">
            <div></div>
          </div>
        </div>
      </ProfileStatsSectionGrid>
      <p></p>
    </ProfileStatsSection>
  );
};

export default ProfileStatsListSkeleton;
