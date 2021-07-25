import { useState, useEffect } from 'react';

import { BasicLoader } from 'src/styled/Loaders';

import {
  RecentChannelsContainer,
  RecentChannelsHeader,
  RecentChannelsContent,
} from './styles';

import ChannelPortraitList from '../ChannelPortraitList';
import { findAllChannels } from 'src/services/channel.service';
import { ChannelI } from 'src/models/Channel.model';

interface Props {}

const RecentChannels: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [channels, setChannels] = useState([] as ChannelI[]);

  async function handleFetchUserChannels() {
    const serviceResponse = await findAllChannels();

    if (!serviceResponse.errorResponse && serviceResponse.data) {
      setChannels(serviceResponse.data);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      handleFetchUserChannels();
      setIsLoading(false);
    }, 600);
  }, []);

  return (
    <RecentChannelsContainer>
      <RecentChannelsHeader>Canais recentes</RecentChannelsHeader>

      {!isLoading && (
        <RecentChannelsContent>
          <ChannelPortraitList channels={channels} />
        </RecentChannelsContent>
      )}

      {isLoading && <BasicLoader />}
    </RecentChannelsContainer>
  );
};

export default RecentChannels;
