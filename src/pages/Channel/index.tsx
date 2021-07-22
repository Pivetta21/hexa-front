import { useState, useContext, useEffect } from 'react';

import AuthContext from 'src/providers/AuthContext';

import { findChannelByUserId } from 'src/services/channel.service';

import { ChannelI } from 'src/models/Channel.model';

import Loading from 'src/components/Loading';

import EditChannel from './EditChannel';
import ChannelContext from 'src/providers/ChannelContext';
import CreateChannel from './CreateChannel';

const Channel: React.FC = () => {
  const { authenticatedUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [channel, setChannel] = useState({} as ChannelI);

  function handleSetChannel(updatedChannel: ChannelI) {
    setChannel(updatedChannel);
  }

  const redirectChannel = async () => {
    if (authenticatedUser) {
      const serviceResponse = await findChannelByUserId(
        authenticatedUser.user.id,
      );

      if (!serviceResponse.errorResponse && serviceResponse.data) {
        await setChannel(serviceResponse.data);
      }

      await setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      redirectChannel();
    }, 1000);
  }, []);

  return (
    <ChannelContext.Provider
      value={{ channel: channel, setChannel: handleSetChannel }}
    >
      <div style={{ height: '100%' }}>
        {isLoading ? <Loading /> : undefined}
        {channel.id && !isLoading ? <EditChannel /> : undefined}
        {!channel.id && !isLoading ? <CreateChannel /> : undefined}
      </div>
    </ChannelContext.Provider>
  );
};

export default Channel;
