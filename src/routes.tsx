import { Switch, Route } from 'react-router-dom';

import NotFound from './pages/NotFound';
import Home from './pages/Home';

const Routes = () => {
  return (
    <Switch>
      <Route path="/discover">
        <h1>Discover Page</h1>
      </Route>
      <Route path="/subscriptions">
        <h1>Subscriptions Page</h1>
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
