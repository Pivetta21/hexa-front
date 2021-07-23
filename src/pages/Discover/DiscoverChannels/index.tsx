import { useEffect } from 'react';

import { findAllChannels } from 'src/services/channel.service';

import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { ChannelI } from 'src/models/Channel.model';
import { useState } from 'react';
import ChannelsList from 'src/components/ChannelsList';
import ChannelListSkeleton from 'src/components/ChannelsList/Skeleton';

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
    <div style={{ margin: '32px 0px', height: '100%', maxHeight: '100vh' }}>
      {!channelsResponse.errorResponse && channelsResponse.data && (
        <ChannelsList channelsList={channelsResponse.data} />
      )}

      {!channelsResponse.data && <ChannelListSkeleton />}
    </div>
  );
};

export default DiscoverChannels;
