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
import { AuthProvider } from 'src/providers/AuthContext';

const App = () => {
  const [theme, setTheme] = usePersistedState<string>('theme', dark.title);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? light.title : dark.title);
  }, [theme]);

  return (
    <ThemeToggleContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme === 'dark' ? dark : light}>
        <GlobalStyle />

        <AuthProvider>
          <BrowserRouter>
            <Navbar />
            <Sidenav />

            <main className="main scroller">
              <Routes />
            </main>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

export default App;
