import { Fragment, useState, useContext, useEffect } from 'react';
import { ChannelI } from 'src/models/Channel.model';
import {
  ChannelAuthorImage,
  ChannelHeader,
  ChannelBanner,
  ChannelInfo,
  ChannelSection,
  ChannelDisplayContainer,
} from './styles';

import { ButtonPrimary, ButtonSecondary } from 'src/styled/Buttons';

import { getBannerPicture } from 'src/services/channel.service';
import { getProfilePicture } from 'src/services/user.service';
import {
  checkIfUserIsFollowingChannel,
  followChannel,
  unfollowChannel,
} from 'src/services/channelUser.service';

import AuthContext from 'src/providers/AuthContext';

interface Props {
  channel: ChannelI;
}

const ChannelDisplay: React.FC<Props> = ({ channel }) => {
  const { authenticatedUser } = useContext(AuthContext);

  const [isFollowing, setIsFollowing] = useState(false);
  const [openUnfollow, setOpenUnfollow] = useState(false);

  async function handleFollowChannel() {
    if (authenticatedUser && authenticatedUser.token) {
      const serviceResponse = await followChannel(
        {
          channelId: channel.id,
          userId: authenticatedUser?.user.id,
        },
        authenticatedUser.token,
      );

      if (!serviceResponse.errorResponse && serviceResponse.data) {
        setIsFollowing(true);
      }
    }
  }

  async function handleUnfollow() {
    if (authenticatedUser && authenticatedUser.token) {
      const serviceResponse = await unfollowChannel(
        channel.id,
        authenticatedUser.token,
      );

      if (!serviceResponse.errorResponse) {
        setIsFollowing(false);
      }
    }
  }

  async function handleFindFollowingChannels() {
    if (authenticatedUser && authenticatedUser.token) {
      const serviceResponse = await checkIfUserIsFollowingChannel(
        {
          channelId: channel.id,
          userId: authenticatedUser.user.id,
        },
        authenticatedUser.token,
      );

      if (!serviceResponse.errorResponse && serviceResponse.data) {
        setIsFollowing(true);
      }
    }
  }

  useEffect(() => {
    handleFindFollowingChannels();
  }, []);

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
            {authenticatedUser?.user ? (
              <Fragment>
                {!isFollowing ? (
                  <ButtonPrimary
                    type="button"
                    onClick={() => handleFollowChannel()}
                  >
                    Seguir Canal
                  </ButtonPrimary>
                ) : (
                  <Fragment>
                    {openUnfollow ? (
                      <ButtonSecondary
                        onMouseLeave={() => setOpenUnfollow(!openUnfollow)}
                        onClick={() => handleUnfollow()}
                      >
                        Deixar de Seguir
                      </ButtonSecondary>
                    ) : (
                      <ButtonPrimary
                        onMouseEnter={() => setOpenUnfollow(!openUnfollow)}
                      >
                        SEGUINDO
                      </ButtonPrimary>
                    )}
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <ButtonPrimary type="button" disabled>
                Seguir Canal
              </ButtonPrimary>
            )}
          </ChannelInfo>
        </ChannelHeader>
      </ChannelSection>
    </ChannelDisplayContainer>
  );
};

export default ChannelDisplay;
