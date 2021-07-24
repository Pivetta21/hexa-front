import { Fragment, useContext, useRef, useState } from 'react';

import useOutsideClick from 'src/hooks/useOutsideClick';

import { ReactComponent as Close } from 'src/assets/svg/icons/Close.svg';

import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonsRowContainer,
  OutlineButton,
} from 'src/styled/Buttons';
import {
  Overlay,
  OverlayClose,
  OverlayContainer,
  OverlayDiv,
} from 'src/styled/Overlay';

import { InlineOption } from 'src/styled/Blocks';
import { ContainerHeader } from 'src/styled/Texts';
import { ServiceError } from 'src/styled/Inputs';

import AuthContext from 'src/providers/AuthContext';
import ChannelContext from 'src/providers/ChannelContext';

import {
  deleteBannerPicture,
  deleteChannel,
} from 'src/services/channel.service';

import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { ChannelI } from 'src/models/Channel.model';

const DeleteChannel: React.FC = () => {
  const { authenticatedUser } = useContext(AuthContext);
  const { channel, setChannel } = useContext(ChannelContext);

  const [deleteChannelRes, setDeleteChannelRes] = useState(
    {} as ServiceResponse<boolean>,
  );

  const deleteChannelRef = useRef(null);
  const [confirmDeleteChannel, setConfirmDeleteChannel] = useOutsideClick(
    deleteChannelRef,
    false,
  );

  async function handleDeleteChannel() {
    if (authenticatedUser && authenticatedUser.token) {
      deleteBannerPicture(authenticatedUser.token, channel);

      const serviceResponse = await deleteChannel(
        authenticatedUser.token,
        channel.id,
      );

      setDeleteChannelRes(serviceResponse);

      if (!serviceResponse.errorResponse && serviceResponse.data) {
        await setConfirmDeleteChannel(false);
        setChannel({} as ChannelI);
      }
    }
  }

  return (
    <Fragment>
      <InlineOption className="w-100" style={{ marginBottom: '0px' }}>
        <div>Deseja excluir seu canal?</div>
        <OutlineButton
          type="button"
          onClick={() => setConfirmDeleteChannel(true)}
        >
          Excluir Canal
        </OutlineButton>
      </InlineOption>

      {confirmDeleteChannel && (
        <OverlayContainer>
          <Overlay>
            <OverlayClose>
              <Close />
            </OverlayClose>

            <OverlayDiv ref={deleteChannelRef}>
              <ContainerHeader>
                Tem certeza que deseja excluir seu canal?
              </ContainerHeader>

              {deleteChannelRes.errorResponse ? (
                <ServiceError>
                  {deleteChannelRes.errorResponse.message}
                </ServiceError>
              ) : null}

              <ButtonsRowContainer>
                <ButtonPrimary
                  type="button"
                  onClick={() => setConfirmDeleteChannel(false)}
                >
                  CANCELAR
                </ButtonPrimary>
                <ButtonSecondary
                  type="button"
                  onClick={() => handleDeleteChannel()}
                >
                  Sim, excluir canal!
                </ButtonSecondary>
              </ButtonsRowContainer>
            </OverlayDiv>
          </Overlay>
        </OverlayContainer>
      )}
    </Fragment>
  );
};

export default DeleteChannel;
