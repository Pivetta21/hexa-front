import { ChannelI } from 'src/models/Channel.model';
import { getProfilePicture } from 'src/services/user.service';
import {
  ChannelPortraitBody,
  ChannelPortraitItem,
  ChannelPortraitListContainer,
} from './styles';

interface Props {
  channels: ChannelI[];
}

const ChannelPortraitList: React.FC<Props> = ({ channels }) => {
  return (
    <ChannelPortraitListContainer>
      {channels.map((channel) => {
        return (
          <ChannelPortraitItem
            to={`/discover/channels/${channel.id}`}
            title={channel.name}
            key={channel.id}
          >
            <img src={getProfilePicture(channel.user)} />
            <ChannelPortraitBody>
              <h1>{channel.name}</h1>
              <div>{channel.user.name}</div>
            </ChannelPortraitBody>
          </ChannelPortraitItem>
        );
      })}
    </ChannelPortraitListContainer>
  );
};

export default ChannelPortraitList;
