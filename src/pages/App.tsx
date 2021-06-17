import { useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import Routes from '../routes';

import { GlobalStyle } from '../styles/global';
import dark from '../styles/themes/dark';
import light from '../styles/themes/light';

import usePersistedState from '../hooks/usePersistedState';

import Navbar from '../components/Navbar';

const App = () => {
  const [theme, setTheme] = usePersistedState<string>('theme', dark.title);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? light.title : dark.title);
  }, [theme]);

  return (
    <ThemeProvider theme={theme === 'dark' ? dark : light}>
      <GlobalStyle />

      <BrowserRouter>
        <Navbar toggleTheme={toggleTheme} />

        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
