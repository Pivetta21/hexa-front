import { createContext } from 'react';

import usePersistedState from 'src/hooks/usePersistedState';
import { login } from 'src/services/user.service';
import { AuthenticatedUser } from 'src/models/AuthenticatedUser.model';

interface AuthContextType {
  authenticatedUser: AuthenticatedUser | null;
  isUserLoggedIn: boolean;
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = usePersistedState<AuthenticatedUser | null>(
    'auth',
    null,
  );

  const handleLogin = async (email: string, password: string) => {
    const authenticatedUser = await login(email, password);

    if (authenticatedUser == null) {
      setUser(null);
    } else {
      setUser({ user: authenticatedUser.user, token: authenticatedUser.token });
    }
  };

  const handleLogout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticatedUser: user,
        isUserLoggedIn: Boolean(user),
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
