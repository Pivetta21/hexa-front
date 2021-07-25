import { useContext, useState, useEffect } from 'react';

import AuthContext from 'src/providers/AuthContext';

import { findFollowingChannels } from 'src/services/channelUser.service';

import { BasicLoader } from 'src/styled/Loaders';

import {
  FollowingChannelsContainer,
  FollowingChannelsHeader,
  FollowingChannelsSection,
  NotFollowingAnyChannel,
} from './styles';

import ChannelPortraitList from '../ChannelPortraitList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { addChannels } from 'src/redux/subscriptionsSlice';

interface Props {}

const FollowingChannels: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const channels = useSelector(
    (state: RootState) => state.subscriptions.channels,
  );

  const { authenticatedUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  async function handleFetchUserChannels() {
    if (authenticatedUser && authenticatedUser.token) {
      const serviceResponse = await findFollowingChannels(
        authenticatedUser.user.id,
        authenticatedUser.token,
      );

      if (!serviceResponse.errorResponse && serviceResponse.data) {
        const channels = serviceResponse.data.map((channelUser) => {
          return channelUser.channel!;
        });

        dispatch(addChannels(channels));
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      handleFetchUserChannels();
      setIsLoading(false);
    }, 600);
  }, []);

  return (
    <FollowingChannelsContainer>
      <FollowingChannelsHeader>Suas inscrições</FollowingChannelsHeader>

      {!isLoading && channels && (
        <FollowingChannelsSection>
          <ChannelPortraitList channels={channels} />
        </FollowingChannelsSection>
      )}

      {!isLoading && !channels && (
        <NotFollowingAnyChannel>
          Você não segue ninguém até o momento.
        </NotFollowingAnyChannel>
      )}

      {isLoading && <BasicLoader />}
    </FollowingChannelsContainer>
  );
};

export default FollowingChannels;
