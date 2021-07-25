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
import { useDispatch } from 'react-redux';
import { follow, unfollow } from 'src/redux/subscriptionsSlice';

interface Props {
  channel: ChannelI;
}

const ChannelDisplay: React.FC<Props> = ({ channel }) => {
  const dispatch = useDispatch();
  const { authenticatedUser } = useContext(AuthContext);

  const [isFollowing, setIsFollowing] = useState(false);

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
        dispatch(follow(channel));
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
        dispatch(unfollow(channel));
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
                    title="Começar a Seguir"
                    onClick={() => handleFollowChannel()}
                  >
                    SEGUIR
                  </ButtonPrimary>
                ) : (
                  <ButtonSecondary
                    type="button"
                    title="Deixar de Seguir"
                    onClick={() => handleUnfollow()}
                  >
                    SEGUINDO
                  </ButtonSecondary>
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
