import { Switch, Route } from 'react-router-dom';

import NotFound from './pages/NotFound';
import Home from './pages/Home';
import ProfileConfig from './pages/ProfileConfig';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Discover from './pages/Discover';
import Channel from './pages/Channel';

const Routes = () => {
  return (
    <Switch key="routes">
      <ProtectedRoute path="/profile/config" component={ProfileConfig} />

      <ProtectedRoute
        path="/profile"
        component={() => <h1 className="main-padding">Perfil</h1>}
        exact
      />

      <ProtectedRoute path="/dashboard" component={Dashboard} exact />

      <Route path="/discover/channels/:id" component={Channel} exact />

      <Route path="/discover/courses/:id" exact>
        <div>Public Course Component</div>
      </Route>

      <Route path="/discover" component={Discover} />

      <Route path="/subscriptions">
        <h1 className="main-padding">Suas Inscrições</h1>
      </Route>

      <Route path="/" component={Home} exact />

      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
