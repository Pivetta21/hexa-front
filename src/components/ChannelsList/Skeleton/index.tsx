import {
  ChannelListSk,
  ChannelItemContainerSk,
  ChannelItemHeaderSk,
} from './styles';

import { BasicLoader } from 'src/styled/Loaders';

const ChannelsListSkeleton: React.FC = () => {
  const channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <ChannelListSk>
      {channels.map((channel) => {
        return (
          <ChannelItemContainerSk key={channel}>
            <ChannelItemHeaderSk>
              <BasicLoader />
            </ChannelItemHeaderSk>
          </ChannelItemContainerSk>
        );
      })}
    </ChannelListSk>
  );
};

export default ChannelsListSkeleton;
