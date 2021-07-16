import { Fragment, useRef } from 'react';

import useOutsideClick from 'src/hooks/useOutsideClick';
import { InlineOption } from 'src/styled/Blocks';
import {
  ButtonPrimary,
  ButtonsColumnContainer,
  ButtonSecondary,
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

interface Props {}

const DeleteAccount: React.FC<Props> = () => {
  const deleteAccountRef = useRef(null);

  const [deleteAccount, setDeleteAccount] = useOutsideClick(
    deleteAccountRef,
    false,
  );

  function handleDeleteAccount() {
    console.log('Deletando conta...');
    setDeleteAccount(false);
  }

  return (
    <Fragment>
      <InlineOption className="w-100">
        <div>Deseja excluir sua conta?</div>
        <OutlineButton onClick={() => setDeleteAccount(true)}>
          Excluir Conta
        </OutlineButton>
      </InlineOption>

      {deleteAccount && (
        <OverlayContainer>
          <Overlay>
            <OverlayClose>
              <Close />
            </OverlayClose>

            <OverlayDiv ref={deleteAccountRef}>
              <ContainerHeader>
                Tem certeza que deseja excluir sua conta?
              </ContainerHeader>
              <ButtonsColumnContainer>
                <ButtonPrimary onClick={() => setDeleteAccount(false)}>
                  Voltar
                </ButtonPrimary>
                <ButtonSecondary onClick={() => handleDeleteAccount()}>
                  Sim, excluir conta!
                </ButtonSecondary>
              </ButtonsColumnContainer>
            </OverlayDiv>
          </Overlay>
        </OverlayContainer>
      )}
    </Fragment>
  );
};

export default DeleteAccount;
