import { Fragment, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Close } from 'src/assets/svg/icons/Close.svg';

import AuthContext from 'src/providers/AuthContext';

import Hexa from 'src/assets/svg/logos/Hexa.svg';

import { ReactComponent as Search } from 'src/assets/svg/icons/Search.svg';
import { ReactComponent as Channel } from 'src/assets/svg/icons/Channel.svg';

import {
  NavContainer,
  NavLogo,
  NavSearchForm,
  NavInputSearch,
  NavInputDivider,
  NavInputButton,
  NavMenu,
} from './styles';

import ProfileAuthenticated from './ProfileAuthenticated';

import { ButtonPrimary, ButtonSecondary } from 'src/styled/Buttons';
import LoginOverlayContext from 'src/providers/LoginOverlayContext';

import LoginOverlay from './LoginOverlay';
import {
  Overlay,
  OverlayClose,
  OverlayContainer,
  OverlayDiv,
} from 'src/styled/Overlay';
import { RefObject } from 'react';
import useOutsideClick from 'src/hooks/useOutsideClick';
import ProfileGuest from './ProfileGuest';

interface Props {}

const Navbar: React.FC<Props> = () => {
  const { isUserLoggedIn } = useContext(AuthContext);

  const refOverlay: RefObject<HTMLDivElement> = useRef(null);
  const [isSignIn, setIsSignIn] = useOutsideClick(refOverlay, false);
  const [isSignUp, setIsSignUp] = useOutsideClick(refOverlay, false);

  function toggleMenu() {
    setIsSignIn(!isSignIn);
    setIsSignUp(!isSignUp);
  }

  function openSignIn() {
    setIsSignIn(true);
  }

  return (
    <NavContainer>
      <NavLogo>
        <Link to="/">
          <img src={Hexa} alt="Hexa Logo" style={{ userSelect: 'none' }} />
        </Link>
      </NavLogo>

      <NavSearchForm>
        <NavInputSearch type="text" placeholder="Pesquisar canal" />
        <NavInputDivider />
        <NavInputButton type="button">
          <Search />
        </NavInputButton>
      </NavSearchForm>

      <NavMenu>
        {isUserLoggedIn && (
          <Fragment>
            <Channel className="navmenu-item navmenu-icon" />

            <ProfileAuthenticated />
          </Fragment>
        )}

        {!isUserLoggedIn && (
          <LoginOverlayContext.Provider
            value={{ toggleMenu, openSignIn, isSignIn, isSignUp }}
          >
            <ButtonSecondary
              className="navmenu-item"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              Entrar
            </ButtonSecondary>

            <ButtonPrimary
              className="navmenu-item"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              Cadastrar-se
            </ButtonPrimary>

            <ProfileGuest />

            {(isSignIn || isSignUp) && (
              <OverlayContainer>
                <Overlay>
                  <OverlayClose>
                    <Close />
                  </OverlayClose>

                  <OverlayDiv ref={refOverlay}>
                    <LoginOverlay />
                  </OverlayDiv>
                </Overlay>
              </OverlayContainer>
            )}
          </LoginOverlayContext.Provider>
        )}
      </NavMenu>
    </NavContainer>
  );
};

export default Navbar;
