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
import { deleteModule } from 'src/services/module.service';
import { ModuleI } from 'src/models/Module.model';
import AuthContext from 'src/providers/AuthContext';

type Props = {
  module: ModuleI;
  modules: ModuleI[];
  setModules: React.Dispatch<React.SetStateAction<ModuleI[]>>;
};

const DeleteModule: React.FC<Props> = ({ module, modules, setModules }) => {
  const { authenticatedUser } = useContext(AuthContext);

  const [deleteModuleRes, setDeleteModuleRes] = useState(
    {} as ServiceResponse<boolean>,
  );

  const deleteModuleRef = useRef(null);
  const [confirmDeleteModule, setConfirmDeleteModule] = useOutsideClick(
    deleteModuleRef,
    false,
  );

  async function handleDeleteModule() {
    const serviceResponse = await deleteModule(
      module.id,
      authenticatedUser!.token!,
    );

    if (!serviceResponse.errorResponse) {
      const newModules = modules.filter((m) => m.id !== module.id);
      setModules(newModules);

      setConfirmDeleteModule(false);
    }

    setDeleteModuleRes(serviceResponse);
  }

  return (
    <Fragment>
      <InlineOption className="w-100" style={{ marginBottom: '0px' }}>
        <div>Excluir esse módulo?</div>
        <OutlineButton
          type="button"
          onClick={() => setConfirmDeleteModule(true)}
        >
          Excluir Módulo
        </OutlineButton>
      </InlineOption>

      {confirmDeleteModule && (
        <OverlayContainer>
          <Overlay>
            <OverlayClose>
              <Close />
            </OverlayClose>

            <OverlayDiv ref={deleteModuleRef}>
              <ContainerHeader>
                Tem certeza que deseja excluir esse módulo?
              </ContainerHeader>

              {deleteModuleRes.errorResponse ? (
                <ServiceError>
                  {deleteModuleRes.errorResponse.message}
                </ServiceError>
              ) : null}

              <ButtonsRowContainer>
                <ButtonPrimary
                  type="button"
                  onClick={() => setConfirmDeleteModule(false)}
                >
                  CANCELAR
                </ButtonPrimary>
                <ButtonSecondary
                  type="button"
                  onClick={() => handleDeleteModule()}
                >
                  Sim, excluir módulo!
                </ButtonSecondary>
              </ButtonsRowContainer>
            </OverlayDiv>
          </Overlay>
        </OverlayContainer>
      )}
    </Fragment>
  );
};

export default DeleteModule;
