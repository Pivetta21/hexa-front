import { ChannelI } from 'src/models/Channel.model';
import {
  ChannelAuthorImage,
  ChannelHeader,
  ChannelBanner,
  ChannelInfo,
  ChannelSection,
  ChannelDisplayContainer,
} from './styles';

import { ButtonPrimary } from 'src/styled/Buttons';
import { getBannerPicture } from 'src/services/channel.service';
import { getProfilePicture } from 'src/services/user.service';

interface Props {
  channel: ChannelI;
}

const ChannelDisplay: React.FC<Props> = ({ channel }) => {
  return (
    <ChannelDisplayContainer>
      <ChannelBanner src={getBannerPicture(channel)} />

      <ChannelSection>
        <ChannelHeader>
          <ChannelAuthorImage src={getProfilePicture(channel.user)} />
          <ChannelInfo>
            <div>
              <h1>{channel.name}</h1>
              <span>{channel.user.name}</span>
            </div>
            <ButtonPrimary>Seguir Canal</ButtonPrimary>
          </ChannelInfo>
        </ChannelHeader>
      </ChannelSection>
    </ChannelDisplayContainer>
  );
};

export default ChannelDisplay;
