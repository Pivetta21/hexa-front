import { useRef, useState, useContext } from 'react';

import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonsRowContainer,
  OutlineButton,
} from 'src/styled/Buttons';

import { ImageUploadInput, ServiceError } from 'src/styled/Inputs';
import { ImageUploadContainer } from 'src/styled/Blocks';

import AuthContext from 'src/providers/AuthContext';

import {
  deleteBannerPicture,
  uploadBannerPicture,
} from 'src/services/channel.service';

import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { ChannelI } from 'src/models/Channel.model';
import ChannelContext from 'src/providers/ChannelContext';
import { isFileImage, isFileImageAccepted } from 'src/services/storage.service';

interface Props {
  initialImage: string;
}

const EditChannelBanner: React.FC<Props> = ({ initialImage }) => {
  const { authenticatedUser } = useContext(AuthContext);
  const { channel, setChannel } = useContext(ChannelContext);

  const [uploadProfilePictureRes, setUploadProfilePictureRes] = useState(
    {} as ServiceResponse<ChannelI>,
  );

  const [imageSrc, setImageSrc] = useState(initialImage);
  const [isUpload, setIsUpload] = useState(false);

  const inputFile = useRef({} as HTMLInputElement);

  function selectImage(event: React.MouseEvent) {
    event.preventDefault();
    inputFile.current.click();
  }

  function handleChange() {
    if (inputFile.current.files) {
      const file = inputFile.current.files[0];
      const reader = new FileReader();

      reader.onloadend = function (ev) {
        setImageSrc(ev.target?.result as string);
      };

      reader.readAsDataURL(file);

      setIsUpload(true);
    }
  }

  function cancelImageUpload() {
    setImageSrc(initialImage);
    setIsUpload(false);
  }

  async function handleUpload() {
    const inputFiles = inputFile.current.files;

    if (inputFiles && authenticatedUser && authenticatedUser.token) {
      const file = inputFiles[0];

      if (isFileImage(file) && isFileImageAccepted(file)) {
        deleteBannerPicture(authenticatedUser.token, channel);

        const serviceResponse = await uploadBannerPicture(
          authenticatedUser.token,
          channel.id,
          file,
        );

        setUploadProfilePictureRes(serviceResponse);

        if (!serviceResponse.errorResponse && serviceResponse.data) {
          setChannel(serviceResponse.data);
        }
      } else {
        uploadProfilePictureRes.errorResponse = {
          message: 'Imagem possui o tipo inválido!',
          statusCode: 400,
        };
        cancelImageUpload();
      }

      setIsUpload(false);
    }
  }

  return (
    <ImageUploadContainer style={{ marginBottom: '0px' }}>
      {uploadProfilePictureRes.errorResponse && (
        <ServiceError style={{ marginTop: '0px' }}>
          {uploadProfilePictureRes.errorResponse.message}
        </ServiceError>
      )}

      <ImageUploadInput className="inline">
        <img src={imageSrc} />

        {!isUpload ? (
          <OutlineButton type="button" onClick={(e) => selectImage(e)}>
            Alterar Foto
          </OutlineButton>
        ) : (
          <ButtonsRowContainer style={{ marginTop: '0px' }}>
            <ButtonPrimary type="button" onClick={() => handleUpload()}>
              Enviar
            </ButtonPrimary>
            <ButtonSecondary type="button" onClick={() => cancelImageUpload()}>
              Cancelar
            </ButtonSecondary>
          </ButtonsRowContainer>
        )}

        <input type="file" ref={inputFile} onChange={handleChange} />
      </ImageUploadInput>
    </ImageUploadContainer>
  );
};

export default EditChannelBanner;
