import { ChannelI } from 'src/models/Channel.model';
import {
  ChannelItemContainer,
  ChannelItemHeader,
  ChannelItemImage,
  ChannelsListContainer,
} from './styles';

import formatDate from 'src/helpers/formatDate';

import { useHistory } from 'react-router-dom';
import { getProfilePicture } from 'src/services/user.service';

interface Props {
  channelsList: ChannelI[];
}

const ChannelsList: React.FC<Props> = ({ channelsList }) => {
  const history = useHistory();

  function navigateTo(channelId: number) {
    history.push(`/discover/channels/${channelId}`);
  }

  return (
    <ChannelsListContainer>
      {channelsList.map((channel) => {
        return (
          <ChannelItemContainer
            key={channel.id}
            onClick={() => navigateTo(channel.id)}
          >
            <ChannelItemImage src={getProfilePicture(channel.user)} />
            <ChannelItemHeader>
              <h1 title={channel.name}>{channel.name}</h1>
              <span>{formatDate('pt-br', channel.created_at)}</span>
              <p>
                {channel.description
                  ? channel.description
                  : 'Este canal ainda não possui uma descrição.'}
              </p>
            </ChannelItemHeader>
          </ChannelItemContainer>
        );
      })}
    </ChannelsListContainer>
  );
};

export default ChannelsList;
