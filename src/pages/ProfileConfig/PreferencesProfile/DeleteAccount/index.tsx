import { Fragment, useRef } from 'react';

import useOutsideClick from 'src/hooks/useOutsideClick';
import { InlineOption } from 'src/styled/Blocks';
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
import { ReactComponent as Close } from 'src/assets/svg/icons/Close.svg';
import { ContainerHeader } from 'src/styled/Texts';
import { deleteProfilePicture, deleteUser } from 'src/services/user.service';
import { useContext } from 'react';
import AuthContext from 'src/providers/AuthContext';
import { useState } from 'react';
import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { ServiceError } from 'src/styled/Inputs';

interface Props {}

const DeleteAccount: React.FC<Props> = () => {
  const { authenticatedUser, logout } = useContext(AuthContext);

  const [deleteUserRes, setDeleteUserRes] = useState(
    {} as ServiceResponse<boolean>,
  );

  const deleteAccountRef = useRef(null);
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useOutsideClick(
    deleteAccountRef,
    false,
  );

  async function handleDeleteAccount() {
    if (authenticatedUser && authenticatedUser.token) {
      deleteProfilePicture(authenticatedUser);

      const serviceResponse = await deleteUser(
        authenticatedUser.token,
        authenticatedUser.user.id,
      );

      setDeleteUserRes(serviceResponse);

      if (!serviceResponse.errorResponse && serviceResponse.data) {
        await setConfirmDeleteAccount(false);
        logout();
      }
    }
  }

  return (
    <Fragment>
      <InlineOption className="w-100">
        <div>Deseja excluir sua conta?</div>
        <OutlineButton onClick={() => setConfirmDeleteAccount(true)}>
          Excluir Conta
        </OutlineButton>
      </InlineOption>

      {confirmDeleteAccount && (
        <OverlayContainer>
          <Overlay>
            <OverlayClose>
              <Close />
            </OverlayClose>

            <OverlayDiv ref={deleteAccountRef}>
              <ContainerHeader>
                Tem certeza que deseja excluir sua conta?
              </ContainerHeader>

              {deleteUserRes.errorResponse ? (
                <ServiceError>
                  {deleteUserRes.errorResponse.message}
                </ServiceError>
              ) : null}

              <ButtonsRowContainer>
                <ButtonPrimary onClick={() => setConfirmDeleteAccount(false)}>
                  CANCELAR
                </ButtonPrimary>
                <ButtonSecondary onClick={() => handleDeleteAccount()}>
                  Sim, excluir conta!
                </ButtonSecondary>
              </ButtonsRowContainer>
            </OverlayDiv>
          </Overlay>
        </OverlayContainer>
      )}
    </Fragment>
  );
};

export default DeleteAccount;
