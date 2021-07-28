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
import CourseDashboardContext from 'src/providers/CourseDashboardContext';

import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { Course } from 'src/models/Course.model';

import { isFileImage, isFileImageAccepted } from 'src/services/storage.service';

import {
  deleteImagePicture,
  uploadImagePicture,
} from 'src/services/course.service';

interface Props {
  initialImage: string;
}

const EditCourseImage: React.FC<Props> = ({ initialImage }) => {
  const { authenticatedUser } = useContext(AuthContext);
  const { course, setCourse } = useContext(CourseDashboardContext);

  const [uploadImagePictureRes, setUploadImagePictureRes] = useState(
    {} as ServiceResponse<Course>,
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
        deleteImagePicture(course, authenticatedUser.token);

        const serviceResponse = await uploadImagePicture(
          course.id,
          file,
          authenticatedUser.token,
        );

        setUploadImagePictureRes(serviceResponse);

        if (!serviceResponse.errorResponse && serviceResponse.data) {
          setCourse(serviceResponse.data);
        }
      } else {
        uploadImagePictureRes.errorResponse = {
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
      {uploadImagePictureRes.errorResponse && (
        <ServiceError style={{ marginTop: '0px' }}>
          {uploadImagePictureRes.errorResponse.message}
        </ServiceError>
      )}

      <ImageUploadInput className="stack">
        <img src={imageSrc} />

        {!isUpload ? (
          <OutlineButton type="button" onClick={(e) => selectImage(e)}>
            Alterar Imagem
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

export default EditCourseImage;
