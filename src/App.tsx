import { useCallback } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider, DefaultTheme } from 'styled-components';

import { GlobalStyle } from './styles/global';
import usePersistedState from './hooks/usePersistedState';

import Navbar from './components/Navbar';
import dark from './styles/themes/dark';
import light from './styles/themes/light';

const App = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', dark);

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'dark' ? light : dark);
  }, [theme.title]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <BrowserRouter>
        <Navbar toggleTheme={toggleTheme} />

        <Switch>
          <Route path="/login">
            <h1>Login Route</h1>
          </Route>
          <Route path="/" exact>
            <h1>Home Route</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
