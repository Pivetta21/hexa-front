import { useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

import AuthContext from 'src/providers/AuthContext';

import { useDispatch, useSelector } from 'react-redux';
import { getChannel } from 'src/redux/channelSlice';
import { RootState } from 'src/redux/store';

import CreateChannel from 'src/pages/Dashboard/CreateChannel';
import Loading from '../Loading';

interface Props {
  path: string;
  exact?: boolean;
  component: React.FC<any>;
}

const DashboardProtectedRoute: React.FC<Props> = (props) => {
  const { authenticatedUser, isUserLoggedIn } = useContext(AuthContext);

  const dispatch = useDispatch();
  const { channel, isChannelMemoized, status } = useSelector(
    (state: RootState) => state.channel,
  );

  async function handleFetchChannel() {
    if (authenticatedUser && !isChannelMemoized) {
      dispatch(await getChannel(authenticatedUser));
    }
  }

  useEffect(() => {
    setTimeout(() => {
      handleFetchChannel();
    }, 400);
  }, []);

  if (status === 'success') {
    if (isUserLoggedIn && channel.id) {
      return <Route {...props} />;
    }

    if (isUserLoggedIn && !channel.id) {
      return <CreateChannel />;
    }

    return <Redirect to="/" />;
  } else {
    if (!isUserLoggedIn) {
      return <Redirect to="/" />;
    }

    return <Loading />;
  }
};

export default DashboardProtectedRoute;
