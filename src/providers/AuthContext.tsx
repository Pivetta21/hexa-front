import { createContext } from 'react';

import usePersistedState from 'src/hooks/usePersistedState';
import { login } from 'src/services/user.service';
import { AuthenticatedUser } from 'src/models/AuthenticatedUser.model';
import { ApiResponse } from 'src/models/ApiResponse.model';

interface AuthContextType {
  authenticatedUser: AuthenticatedUser | null;
  isUserLoggedIn: boolean;
  login(
    email: string,
    password: string,
  ): Promise<ApiResponse<AuthenticatedUser>>;
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] =
    usePersistedState<AuthenticatedUser | null>('auth', null);

  const handleLogin = async (email: string, password: string) => {
    const response: ApiResponse<AuthenticatedUser> = {
      dirty: false,
      errors: false,
    };

    const authenticatedUser = await login(email, password);

    if (authenticatedUser != null) {
      setAuthenticatedUser({
        user: authenticatedUser.user,
        token: authenticatedUser.token,
      });
    } else {
      response.errorMessage = 'Verifique seus dados!';
      response.errors = true;
      setAuthenticatedUser(null);
    }

    response.dirty = true;

    return response;
  };

  const handleLogout = async () => {
    setAuthenticatedUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticatedUser: authenticatedUser,
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
