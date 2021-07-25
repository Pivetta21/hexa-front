import { useContext, useState, useEffect } from 'react';

import { ChannelI } from 'src/models/Channel.model';

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

interface Props {}

const FollowingChannels: React.FC<Props> = () => {
  const { authenticatedUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [channels, setChannels] = useState([] as ChannelI[]);

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

        setChannels(channels);
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
      <FollowingChannelsHeader>Canais que você segue</FollowingChannelsHeader>

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
