import { ChannelI } from 'src/models/Channel.model';
import {
  ChannelContainer,
  ChannelHeader,
  ChannelImage,
  ChannelsListContainer,
} from './styles';

import formatDate from 'src/helpers/formatDate';

import { getBannerPicture } from 'src/services/channel.service';
import { useHistory } from 'react-router-dom';

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
          <ChannelContainer
            key={channel.id}
            onClick={() => navigateTo(channel.id)}
          >
            <ChannelImage src={getBannerPicture(channel)} />
            <ChannelHeader>
              <h1 title={channel.name}>{channel.name}</h1>
              <span>{formatDate('pt-br', channel.created_at)}</span>
              <p>
                {channel.description
                  ? channel.description
                  : 'Este canal ainda não possui uma descrição.'}
              </p>
            </ChannelHeader>
          </ChannelContainer>
        );
      })}
    </ChannelsListContainer>
  );
};

export default ChannelsList;
