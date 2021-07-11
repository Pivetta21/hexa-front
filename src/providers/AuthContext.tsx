import { createContext } from 'react';

import usePersistedState from 'src/hooks/usePersistedState';

import { login, createUser } from 'src/services/user.service';
import { ApiResponse } from 'src/models/ApiResponse.model';
import { AuthenticatedUser } from 'src/models/AuthenticatedUser.model';
import { User } from 'src/models/User.model';

interface AuthContextType {
  authenticatedUser: AuthenticatedUser | null;
  isUserLoggedIn: boolean;
  login(
    email: string,
    password: string,
  ): Promise<ApiResponse<AuthenticatedUser>>;
  signUp(
    name: string,
    email: string,
    password: string,
  ): Promise<ApiResponse<User>>;
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
      response.errorMessage = 'Problema ao logar! Tente novamente.';
      response.errors = true;
      setAuthenticatedUser(null);
    }

    response.dirty = true;

    return response;
  };

  const handleSignUp = async (
    name: string,
    email: string,
    password: string,
  ) => {
    const response: ApiResponse<User> = {
      dirty: false,
      errors: false,
    };

    const user = await createUser(name, email, password);

    if (user != null) {
      response.data = user;
    } else {
      response.errorMessage = 'Erro ao criar conta! Tente novamente.';
      response.errors = true;
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
        signUp: handleSignUp,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
