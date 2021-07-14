import { createContext } from 'react';

interface LoginOverlayContextType {
  toggleMenu: () => void;
  openSignIn: () => void;
  isSignIn: boolean;
  isSignUp: boolean;
}

const LoginOverlayContext = createContext<LoginOverlayContextType>(
  {} as LoginOverlayContextType,
);

export default LoginOverlayContext;
