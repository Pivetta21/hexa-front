import { Switch, Route } from 'react-router-dom';

import NotFound from './pages/NotFound';
import Home from './pages/Home';
import ProfileConfig from './pages/ProfileConfig';
import ProtectedRoute from './components/ProtectedRoute';

const Routes = () => {
  return (
    <Switch key="routes">
      <ProtectedRoute path="/profile/config" component={ProfileConfig} />

      <ProtectedRoute
        path="/profile"
        component={() => <h1 className="main-padding">Perfil</h1>}
        exact
      />

      <Route path="/channel" exact>
        <h1 className="main-padding">Seu Canal</h1>
      </Route>

      <Route path="/discover" exact>
        <h1 className="main-padding">Descobrir</h1>
      </Route>

      <Route path="/subscriptions" exact>
        <h1 className="main-padding">Suas Inscrições</h1>
      </Route>

      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
