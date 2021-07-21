import { useRef, useState } from 'react';

import { ImageUploadContainer } from './styles';

import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonsRowContainer,
  OutlineButton,
} from 'src/styled/Buttons';
import {
  deleteImage,
  DeleteImageOptions,
  uploadImage,
} from 'src/services/storage.service';
import { useContext } from 'react';
import AuthContext from 'src/providers/AuthContext';
import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { FileStorage } from 'src/models/FileStorage.model';
import { updateUser } from 'src/services/user.service';

interface Props {
  initialImage: string;
}

const ProfileImageUpload: React.FC<Props> = ({ initialImage }) => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const [uploadImageRes, setUploadImageRes] = useState(
    {} as ServiceResponse<FileStorage>,
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
    if (inputFile.current.files && authenticatedUser) {
      const file = inputFile.current.files[0];

      if (authenticatedUser.user.pictureUrl) {
        deleteImage(
          authenticatedUser,
          DeleteImageOptions.PROFILE_PICTURE,
          authenticatedUser.user.pictureUrl,
        );
      }

      const serviceResponse = await uploadImage(authenticatedUser, file);

      setUploadImageRes(serviceResponse);

      const updatedUser = await updateUser(authenticatedUser, {
        pictureUrl: serviceResponse.data?.path,
      });

      if (updatedUser.data) {
        setAuthenticatedUser({
          user: updatedUser.data,
          token: authenticatedUser.token,
        });

        setIsUpload(false);
      }
    }
  }

  return (
    <ImageUploadContainer>
      {uploadImageRes.errorResponse && (
        <div>uploadImageRes.errorResponse.message</div>
      )}
      <div className="stack">
        <img src={imageSrc} />

        {!isUpload ? (
          <OutlineButton type="button" onClick={(e) => selectImage(e)}>
            Alterar Foto
          </OutlineButton>
        ) : (
          <ButtonsRowContainer style={{ marginTop: '0px' }}>
            <ButtonPrimary type="button" onClick={() => handleUpload()}>
              Salvar
            </ButtonPrimary>
            <ButtonSecondary type="button" onClick={() => cancelImageUpload()}>
              Cancelar
            </ButtonSecondary>
          </ButtonsRowContainer>
        )}

        <input type="file" ref={inputFile} onChange={handleChange} />
      </div>
    </ImageUploadContainer>
  );
};

export default ProfileImageUpload;
