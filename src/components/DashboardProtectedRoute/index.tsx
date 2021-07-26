import { useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

import AuthContext from 'src/providers/AuthContext';

import { useDispatch, useSelector } from 'react-redux';
import { getChannel } from 'src/redux/channelSlice';
import { RootState } from 'src/redux/store';

import CreateChannel from 'src/pages/Dashboard/CreateChannel';

interface Props {
  path: string;
  exact?: boolean;
  component: React.FC<any>;
}

const ChannelProtectedRoute: React.FC<Props> = (props) => {
  const { authenticatedUser, isUserLoggedIn } = useContext(AuthContext);

  const dispatch = useDispatch();
  const { channel, isChannelMemoized } = useSelector(
    (state: RootState) => state.channel,
  );

  async function handleFetchChannel() {
    if (authenticatedUser && !isChannelMemoized) {
      dispatch(await getChannel(authenticatedUser));
    }
  }

  useEffect(() => {
    handleFetchChannel();
  }, []);

  if (isUserLoggedIn && channel.id) {
    return <Route {...props} />;
  } else if (isUserLoggedIn && !channel.id) {
    return <CreateChannel />;
  } else {
    return <Redirect to="/" />;
  }
};

export default ChannelProtectedRoute;
