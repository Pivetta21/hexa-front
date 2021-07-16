import { useContext } from 'react';

import { LoginOverlayContainer, LoginNav, LoginNavLink } from './style';

import LoginOverlayContext from 'src/providers/LoginOverlayContext';

import SignUp from './SignUp';
import SignIn from './SignIn';

interface Props {}

const LoginOverlay: React.FC<Props> = () => {
  const { toggleMenu, isSignIn, isSignUp } = useContext(LoginOverlayContext);

  return (
    <LoginOverlayContainer>
      {isSignIn && <h1 className="login-header">Entrar na Hexa</h1>}
      {isSignUp && <h1 className="login-header">Cadastrar-se na Hexa</h1>}

      <LoginNav>
        <LoginNavLink
          className={isSignIn ? 'active' : ''}
          onClick={() => toggleMenu()}
        >
          Entrar
        </LoginNavLink>
        <LoginNavLink
          className={isSignUp ? 'active' : ''}
          onClick={() => toggleMenu()}
        >
          Cadastrar-se
        </LoginNavLink>
      </LoginNav>

      {isSignIn && <SignIn />}
      {isSignUp && <SignUp />}
    </LoginOverlayContainer>
  );
};

export default LoginOverlay;
