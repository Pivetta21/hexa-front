import {
  ChannelPortraitBodySk,
  ChannelPortraitImageSk,
  ChannelPortraitItemSk,
  ChannelPortraitListContainerSk,
} from './styles';

const ChannelPortraitListSkeleton: React.FC = () => {
  const channels = [1, 2, 3, 4, 5, 6];

  return (
    <ChannelPortraitListContainerSk>
      {channels.map((channel) => {
        return (
          <ChannelPortraitItemSk key={channel}>
            <ChannelPortraitImageSk />
            <ChannelPortraitBodySk>
              <h1></h1>
              <div></div>
            </ChannelPortraitBodySk>
          </ChannelPortraitItemSk>
        );
      })}
    </ChannelPortraitListContainerSk>
  );
};

export default ChannelPortraitListSkeleton;
