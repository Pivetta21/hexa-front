import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

import {
  FollowingChannelsContainer,
  FollowingChannelsHeader,
  FollowingChannelsContent,
} from './styles';

import ChannelPortraitList from '../ChannelPortraitList';
import ChannelPortraitListSkeleton from '../ChannelPortraitList/Skeleton';

interface Props {}

const FollowingChannels: React.FC<Props> = () => {
  const subscriptions = useSelector((state: RootState) => state.subscriptions);

  return (
    <FollowingChannelsContainer>
      <FollowingChannelsHeader>Suas inscrições</FollowingChannelsHeader>

      {subscriptions.status === 'success' && (
        <FollowingChannelsContent>
          <ChannelPortraitList channels={subscriptions.channels} />
        </FollowingChannelsContent>
      )}

      {subscriptions.status === 'loading' && <ChannelPortraitListSkeleton />}
    </FollowingChannelsContainer>
  );
};

export default FollowingChannels;
