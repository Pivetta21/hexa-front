import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Switch>
        <Route path="/login">
          <h1>Login Route</h1>
        </Route>
        <Route path="/" exact>
          <h1>Home Route</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
