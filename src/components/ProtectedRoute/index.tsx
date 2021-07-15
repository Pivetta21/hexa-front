import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from 'src/providers/AuthContext';

interface Props {
  path: string;
  exact?: boolean;
  component: React.FC<any>;
}

const ProtectedRoute: React.FC<Props> = (props) => {
  const { isUserLoggedIn } = useContext(AuthContext);

  if (isUserLoggedIn) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
};

export default ProtectedRoute;
