import { createContext } from 'react';

import usePersistedState from 'src/hooks/usePersistedState';

import { login } from 'src/services/user.service';
import { ServiceResponse } from 'src/models/ServiceResponse.model';
import { AuthenticatedUser } from 'src/models/AuthenticatedUser.model';

interface AuthContextType {
  authenticatedUser: AuthenticatedUser | null;
  setAuthenticatedUser(user: AuthenticatedUser | null): void;
  isUserLoggedIn: boolean;
  login(
    email: string,
    password: string,
  ): Promise<ServiceResponse<AuthenticatedUser>>;
  logout(): void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] =
    usePersistedState<AuthenticatedUser | null>('auth', null);

  const handleLogin = async (email: string, password: string) => {
    const loginResponse = await login(email, password);

    if (loginResponse.data) {
      setAuthenticatedUser(loginResponse.data);
    } else {
      setAuthenticatedUser(null);
    }

    return loginResponse;
  };

  const handleSetAuthenticatedUser = (
    authenticatedUser: AuthenticatedUser | null,
  ): void => {
    setAuthenticatedUser(authenticatedUser);
  };

  const handleLogout = () => {
    setAuthenticatedUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticatedUser,
        setAuthenticatedUser: handleSetAuthenticatedUser,
        isUserLoggedIn: Boolean(authenticatedUser),
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
