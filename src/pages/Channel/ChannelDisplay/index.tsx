import { Fragment, useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ChannelI } from 'src/models/Channel.model';
import {
  ChannelAuthorImage,
  ChannelHeader,
  ChannelBanner,
  ChannelInfo,
  ChannelSection,
  ChannelDisplayContainer,
  ChannelDisplayActions,
} from './styles';

import { ButtonPrimary, ButtonSecondary } from 'src/styled/Buttons';

import { ReactComponent as Cog } from 'src/assets/svg/icons/Cog.svg';

import { getBannerPicture } from 'src/services/channel.service';
import { getProfilePicture } from 'src/services/user.service';
import {
  checkIfUserIsFollowingChannel,
  followChannel,
  unfollowChannel,
} from 'src/services/channelUser.service';

import AuthContext from 'src/providers/AuthContext';
import { follow, unfollow } from 'src/redux/subscriptionsSlice';

interface Props {
  channel: ChannelI;
}

const ChannelDisplay: React.FC<Props> = ({ channel }) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { authenticatedUser, isUserLoggedIn } = useContext(AuthContext);

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
      } else {
        setIsFollowing(false);
      }
    }
  }

  function isChannelOwner() {
    return channel.user.id === authenticatedUser?.user.id;
  }

  useEffect(() => {
    handleFindFollowingChannels();

    return () => {
      setIsFollowing(false);
    };
  }, [isUserLoggedIn]);

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
                {!isFollowing && !isChannelOwner() && (
                  <ButtonPrimary
                    type="button"
                    title="Começar a Seguir"
                    onClick={() => handleFollowChannel()}
                  >
                    SEGUIR
                  </ButtonPrimary>
                )}
                {isFollowing && !isChannelOwner() && (
                  <ButtonSecondary
                    type="button"
                    title="Deixar de Seguir"
                    onClick={() => handleUnfollow()}
                  >
                    SEGUINDO
                  </ButtonSecondary>
                )}
                {isChannelOwner() && (
                  <ChannelDisplayActions>
                    <Cog
                      title="Editar canal"
                      onClick={() => history.push('/dashboard/edit')}
                    />
                    <ButtonPrimary
                      type="button"
                      title="Painel de controle"
                      onClick={() => history.push('/dashboard')}
                    >
                      DASHBOARD
                    </ButtonPrimary>
                  </ChannelDisplayActions>
                )}
              </Fragment>
            ) : (
              <ButtonPrimary type="button" disabled>
                SEGUIR
              </ButtonPrimary>
            )}
          </ChannelInfo>
        </ChannelHeader>
      </ChannelSection>
    </ChannelDisplayContainer>
  );
};

export default ChannelDisplay;
