import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

import { BasicLoader } from 'src/styled/Loaders';

import {
  FollowingChannelsContainer,
  FollowingChannelsHeader,
  FollowingChannelsContent,
} from './styles';

import ChannelPortraitList from '../ChannelPortraitList';

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

      {subscriptions.status === 'loading' && <BasicLoader />}
    </FollowingChannelsContainer>
  );
};

export default FollowingChannels;
