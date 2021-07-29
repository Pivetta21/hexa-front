import {
  ChannelItemContainerSk,
  ChannelItemHeaderSk,
  ChannelItemImageSk,
  ChannelsListContainerSk,
} from 'src/styled/ChannelsListSkeleton';

const ChannelsListSkeleton: React.FC = () => {
  const channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <ChannelsListContainerSk>
      {channels.map((channel) => {
        return (
          <ChannelItemContainerSk key={channel}>
            <ChannelItemImageSk className="img" />
            <ChannelItemHeaderSk>
              <h1></h1>
              <div></div>
              <p></p>
            </ChannelItemHeaderSk>
          </ChannelItemContainerSk>
        );
      })}
    </ChannelsListContainerSk>
  );
};

export default ChannelsListSkeleton;
