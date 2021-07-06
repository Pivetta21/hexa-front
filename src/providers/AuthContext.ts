import { createContext } from 'react';

interface AuthContextType {
  user: object | null;
  isUserLoggedIn: boolean;
  login(): Promise<void>;
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
