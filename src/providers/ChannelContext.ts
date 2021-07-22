import { createContext } from 'react';

import { ChannelI } from 'src/models/Channel.model';

interface ChannelContext {
  channel: ChannelI;
  setChannel(updatedChannel: ChannelI): void;
}

const ChannelContext = createContext<ChannelContext>({} as ChannelContext);

export default ChannelContext;
