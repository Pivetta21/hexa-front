import { useRef, Fragment, RefObject } from 'react';

import useOutsideClick from 'src/hooks/useOutsideClick';

import { ReactComponent as Close } from 'src/assets/svg/icons/Close.svg';

import {
  Overlay,
  OverlayClose,
  OverlayContainer,
  OverlayDiv,
} from 'src/styled/Overlay';
import { ButtonPrimary, ButtonSecondary } from 'src/styled/Buttons';

import { LoginContainer, LoginNav } from './style';

import SignUp from './SignUp';
import SignIn from './SignIn';

interface Props {}

const Login: React.FC<Props> = () => {
  const refSignIn: RefObject<HTMLDivElement> = useRef(null);
  const [openSignIn, setOpenSignIn] = useOutsideClick(refSignIn, false);

  const refSignUp: RefObject<HTMLDivElement> = useRef(null);
  const [openSignUp, setOpenSignUp] = useOutsideClick(refSignUp, false);

  function toggleMenu() {
    setOpenSignIn(!openSignIn);
    setOpenSignUp(!openSignUp);
  }

  return (
    <Fragment>
      <ButtonSecondary
        className="navmenu-item"
        onClick={() => setOpenSignIn(!openSignIn)}
      >
        Entrar
      </ButtonSecondary>

      <ButtonPrimary
        className="navmenu-item"
        onClick={() => setOpenSignUp(!openSignUp)}
      >
        Cadastrar-se
      </ButtonPrimary>

      {(openSignIn || openSignUp) && (
        <OverlayContainer>
          <Overlay>
            <OverlayClose>
              <Close />
            </OverlayClose>

            {openSignIn && (
              <OverlayDiv ref={refSignIn}>
                <LoginContainer>
                  <h1>Entrar na Hexa</h1>
                  <LoginNav>
                    <div className="active">Entrar</div>
                    <div onClick={() => toggleMenu()}>Cadastrar-se</div>
                  </LoginNav>
                </LoginContainer>
                <SignIn />
              </OverlayDiv>
            )}

            {openSignUp && (
              <OverlayDiv ref={refSignUp}>
                <LoginContainer>
                  <h1>Cadastrar-se na Hexa</h1>
                  <LoginNav>
                    <div onClick={() => toggleMenu()}>Entrar</div>
                    <div className="active">Cadastrar-se</div>
                  </LoginNav>
                </LoginContainer>
                <SignUp />
              </OverlayDiv>
            )}
          </Overlay>
        </OverlayContainer>
      )}
    </Fragment>
  );
};

export default Login;
