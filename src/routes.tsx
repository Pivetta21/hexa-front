import { Switch, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import DashboardProtectedRoute from './components/DashboardProtectedRoute';

import NotFound from './pages/NotFound';

import Home from './pages/Home';
import Discover from './pages/Discover';
import Channel from './pages/Channel';

import ProfileConfig from './pages/ProfileConfig';

import Dashboard from './pages/Dashboard';
import EditChannel from './pages/Dashboard/EditChannel';
import CreateCourse from './pages/Dashboard/CreateCourse';
import EditCourse from './pages/Dashboard/EditCourse';
import Subscriptions from './pages/Subscriptions';

const Routes = () => {
  return (
    <Switch key="routes">
      <ProtectedRoute path="/profile/config" component={ProfileConfig} />
      <ProtectedRoute
        path="/profile"
        component={() => <h1 className="main-padding">Perfil</h1>}
        exact
      />

      <DashboardProtectedRoute
        path="/dashboard/course/:id"
        component={EditCourse}
      />
      <DashboardProtectedRoute
        path="/dashboard/create-course"
        component={CreateCourse}
      />
      <DashboardProtectedRoute
        path="/dashboard/edit-channel"
        component={EditChannel}
      />
      <DashboardProtectedRoute path="/dashboard" component={Dashboard} exact />

      <Route path="/discover/channels/:id" component={Channel} />
      <Route path="/discover/courses/:id">
        <div>Public Course Component</div>
      </Route>
      <Route path="/discover" component={Discover} />

      <ProtectedRoute path="/subscriptions" component={Subscriptions} />

      <Route path="/" component={Home} exact />

      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
