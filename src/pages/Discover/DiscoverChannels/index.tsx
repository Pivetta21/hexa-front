import { useEffect } from 'react';

import { findAllChannels } from 'src/services/channel.service';

import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { ChannelI } from 'src/models/Channel.model';
import { useState } from 'react';
import ChannelsList from 'src/pages/Discover/DiscoverChannels/ChannelsList';
import ChannelListSkeleton from 'src/pages/Discover/DiscoverChannels/ChannelsList/Skeleton';
import { ListBlock } from 'src/styled/Blocks';

interface Props {}

const DiscoverChannels: React.FC<Props> = () => {
  const [channelsResponse, setChannelsResponse] = useState(
    {} as ServiceResponse<ChannelI[]>,
  );

  async function fetchChannels() {
    const serviceResponse = await findAllChannels();

    setChannelsResponse(serviceResponse);
  }

  useEffect(() => {
    setTimeout(() => {
      fetchChannels();
    }, 1000);
  }, []);

  return (
    <ListBlock>
      {!channelsResponse.errorResponse && channelsResponse.data && (
        <ChannelsList channelsList={channelsResponse.data} />
      )}

      {!channelsResponse.data && <ChannelListSkeleton />}
    </ListBlock>
  );
};

export default DiscoverChannels;
