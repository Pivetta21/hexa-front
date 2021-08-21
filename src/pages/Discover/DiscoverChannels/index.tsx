import { Fragment, useEffect } from 'react';

import { findAllChannels } from 'src/services/channel.service';

import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { ChannelI } from 'src/models/Channel.model';
import { useState } from 'react';
import ChannelsList from 'src/pages/Discover/DiscoverChannels/ChannelsList';
import ChannelListSkeleton from 'src/pages/Discover/DiscoverChannels/ChannelsList/Skeleton';
import { ListBlock } from 'src/styled/Blocks';
import { DefaultInput } from 'src/styled/Inputs';

interface Props {}

const DiscoverChannels: React.FC<Props> = () => {
  const [filteredChannels, setFilteredChannels] = useState([] as ChannelI[]);
  const [channelsResponse, setChannelsResponse] = useState(
    {} as ServiceResponse<ChannelI[]>,
  );

  function findChannelByName(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;

    const filterValues = channelsResponse.data?.filter((course) => {
      const courseName = course.name.trim().toLocaleLowerCase();

      return courseName.includes(value.trim().toLocaleLowerCase());
    });

    if (filterValues) setFilteredChannels(filterValues);
  }

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
    <Fragment>
      {!channelsResponse.errorResponse && channelsResponse.data && (
        <Fragment>
          <DefaultInput>
            <input
              type="text"
              onChange={(e) => findChannelByName(e)}
              placeholder="Buscar um canal por nome..."
            />
          </DefaultInput>
          <ListBlock>
            <ChannelsList
              channelsList={
                filteredChannels.length > 0
                  ? filteredChannels
                  : channelsResponse.data
              }
            />
          </ListBlock>
        </Fragment>
      )}

      {!channelsResponse.data && (
        <div style={{ marginTop: '24px' }}>
          <ChannelListSkeleton />
        </div>
      )}
    </Fragment>
  );
};

export default DiscoverChannels;
