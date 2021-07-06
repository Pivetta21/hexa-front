import { useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import Routes from 'src/routes';

import { GlobalStyle } from 'src/styles/global';
import dark from 'src/styles/themes/dark';
import light from 'src/styles/themes/light';

import Navbar from 'src/components/Navbar';
import Sidenav from 'src/components/Sidenav';

import usePersistedState from 'src/hooks/usePersistedState';

import ThemeToggleContext from 'src/providers/ThemeToggleContext';
import AuthContext from 'src/providers/AuthContext';

const App = () => {
  // Theme Context
  const [theme, setTheme] = usePersistedState<string>('theme', dark.title);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? light.title : dark.title);
  }, [theme]);

  // Auth Context
  const [user, setUser] = usePersistedState<object | null>('user', null);

  const login = async () => {
    setUser({ name: 'Lucas', token: 'JWT1234' });
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <ThemeToggleContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme === 'dark' ? dark : light}>
        <GlobalStyle />

        <AuthContext.Provider
          value={{ user, isUserLoggedIn: Boolean(user), login, logout }}
        >
          <BrowserRouter>
            <Navbar />
            <Sidenav />

            <main className="main scroller">
              <Routes />
            </main>
          </BrowserRouter>
        </AuthContext.Provider>
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

export default App;
