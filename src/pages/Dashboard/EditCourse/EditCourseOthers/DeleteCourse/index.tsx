import { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

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

import useOutsideClick from 'src/hooks/useOutsideClick';

import AuthContext from 'src/providers/AuthContext';
import CourseDashboardContext from 'src/providers/CourseDashboardContext';

import { deleteCourse, deleteImagePicture } from 'src/services/course.service';
import { ServiceResponse } from 'src/models/ServiceResponse.model';

const DeleteCourse: React.FC = () => {
  const history = useHistory();

  const { channel } = useSelector((state: RootState) => state.channel);

  const { authenticatedUser } = useContext(AuthContext);
  const { course } = useContext(CourseDashboardContext);

  const [deleteCourseResponse, setDeleteCourseResponse] = useState(
    {} as ServiceResponse<any>,
  );

  const deleteCourseRef = useRef(null);
  const [confirmDeleteCourse, setConfirmDeleteCourse] = useOutsideClick(
    deleteCourseRef,
    false,
  );

  async function handleDeleteCourse() {
    if (authenticatedUser && authenticatedUser.token) {
      deleteImagePicture(course, authenticatedUser.token);

      const serviceResponse = await deleteCourse(
        { courseId: course.id, channelId: channel.id },
        authenticatedUser.token,
      );

      setDeleteCourseResponse(serviceResponse);

      if (!serviceResponse.errorResponse) {
        setConfirmDeleteCourse(false);
        history.push('/dashboard');
      }
    }
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <InlineOption className="w-100" style={{ marginBottom: '0px' }}>
        <div>Deseja excluir seu curso?</div>
        <OutlineButton
          type="button"
          onClick={() => setConfirmDeleteCourse(true)}
        >
          Excluir Curso
        </OutlineButton>
      </InlineOption>

      {confirmDeleteCourse && (
        <OverlayContainer>
          <Overlay>
            <OverlayClose>
              <Close />
            </OverlayClose>

            <OverlayDiv ref={deleteCourseRef}>
              <ContainerHeader>
                Tem certeza que deseja excluir seu curso?
              </ContainerHeader>
              <p style={{ marginTop: '12px' }}>
                Seu curso: <b>{course.name}</b>
              </p>

              {deleteCourseResponse.errorResponse ? (
                <ServiceError>
                  {deleteCourseResponse.errorResponse.message}
                </ServiceError>
              ) : null}

              <ButtonsRowContainer>
                <ButtonPrimary
                  type="button"
                  onClick={() => setConfirmDeleteCourse(false)}
                >
                  CANCELAR
                </ButtonPrimary>
                <ButtonSecondary
                  type="button"
                  onClick={() => handleDeleteCourse()}
                >
                  Sim, excluir curso!
                </ButtonSecondary>
              </ButtonsRowContainer>
            </OverlayDiv>
          </Overlay>
        </OverlayContainer>
      )}
    </div>
  );
};

export default DeleteCourse;
