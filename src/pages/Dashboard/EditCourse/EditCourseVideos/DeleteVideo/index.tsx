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

import { ServiceResponse } from 'src/models/ServiceResponse.model';
import AuthContext from 'src/providers/AuthContext';
import { VideoI } from 'src/models/Video.model';

import { removeVideo } from 'src/services/video.service';

type Props = {
  video: VideoI;
  videos: VideoI[];
  setVideos: React.Dispatch<React.SetStateAction<VideoI[]>>;
  setVideoIndex: React.Dispatch<React.SetStateAction<number>>;
};

const DeleteVideo: React.FC<Props> = ({
  video,
  videos,
  setVideos,
  setVideoIndex,
}) => {
  const { authenticatedUser } = useContext(AuthContext);

  const [deleteVideoRes, setDeleteVideoRes] = useState(
    {} as ServiceResponse<boolean>,
  );

  const deleteVideoRef = useRef(null);
  const [confirmDeleteVideo, setConfirmDeleteVideo] = useOutsideClick(
    deleteVideoRef,
    false,
  );

  async function handleRemoveVideo() {
    const serviceResponse = await removeVideo(
      video.id,
      authenticatedUser!.token!,
    );

    if (!serviceResponse.errorResponse) {
      const newVideos = videos.filter((v) => v.id !== video.id);
      setVideos(newVideos);
      setVideoIndex(-1);

      setConfirmDeleteVideo(false);
    }

    setDeleteVideoRes(serviceResponse);
  }

  return (
    <Fragment>
      <InlineOption
        className="w-100"
        style={{ marginBottom: '0px', marginTop: '16px' }}
      >
        <div>Deseja excluir esse vídeo?</div>
        <OutlineButton
          type="button"
          onClick={() => setConfirmDeleteVideo(true)}
        >
          Excluir Vídeo
        </OutlineButton>
      </InlineOption>

      {confirmDeleteVideo && (
        <OverlayContainer>
          <Overlay>
            <OverlayClose>
              <Close />
            </OverlayClose>

            <OverlayDiv ref={deleteVideoRef}>
              <ContainerHeader>
                Tem certeza que deseja excluir esse vídeo?
              </ContainerHeader>

              {deleteVideoRes.errorResponse ? (
                <ServiceError>
                  {deleteVideoRes.errorResponse.message}
                </ServiceError>
              ) : null}

              <ButtonsRowContainer>
                <ButtonPrimary
                  type="button"
                  onClick={() => setConfirmDeleteVideo(false)}
                >
                  CANCELAR
                </ButtonPrimary>
                <ButtonSecondary
                  type="button"
                  onClick={() => handleRemoveVideo()}
                >
                  Sim, excluir vídeo!
                </ButtonSecondary>
              </ButtonsRowContainer>
            </OverlayDiv>
          </Overlay>
        </OverlayContainer>
      )}
    </Fragment>
  );
};

export default DeleteVideo;
