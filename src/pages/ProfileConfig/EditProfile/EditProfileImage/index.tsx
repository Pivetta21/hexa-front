import { useRef, useState, useContext } from 'react';

import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonsRowContainer,
  OutlineButton,
} from 'src/styled/Buttons';
import { ImageUploadInput, ServiceError } from 'src/styled/Inputs';
import { ImageUploadContainer } from 'src/styled/Blocks';

import {
  deleteProfilePicture,
  uploadProfilePicture,
} from 'src/services/user.service';
import { isFileImage, isFileImageAccepted } from 'src/services/storage.service';

import AuthContext from 'src/providers/AuthContext';

import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { User } from 'src/models/User.model';

interface Props {
  initialImage: string;
}

const EditProfileImage: React.FC<Props> = ({ initialImage }) => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const [uploadProfilePictureRes, setUploadProfilePictureRes] = useState(
    {} as ServiceResponse<User>,
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
    setIsUpload(false);
    setImageSrc(initialImage);
  }

  async function handleUpload() {
    const inputFiles = inputFile.current.files;

    if (inputFiles && authenticatedUser && authenticatedUser.token) {
      const file = inputFiles[0];

      if (isFileImage(file) && isFileImageAccepted(file)) {
        deleteProfilePicture(authenticatedUser);

        const serviceResponse = await uploadProfilePicture(
          authenticatedUser.token,
          authenticatedUser.user.id,
          file,
        );

        setUploadProfilePictureRes(serviceResponse);

        if (!serviceResponse.errorResponse && serviceResponse.data) {
          await setAuthenticatedUser({
            user: serviceResponse.data,
            token: authenticatedUser.token,
          });
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
    <ImageUploadContainer>
      {uploadProfilePictureRes.errorResponse && (
        <ServiceError style={{ marginTop: '0px' }}>
          {uploadProfilePictureRes.errorResponse.message}
        </ServiceError>
      )}

      <ImageUploadInput className="stack">
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

export default EditProfileImage;
