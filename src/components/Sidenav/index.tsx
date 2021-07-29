import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/redux/store';

import AuthContext from 'src/providers/AuthContext';

import {
  SidenavContainer,
  SidenavLinks,
  SidenavLink,
  SideNavDivider,
} from './styles';

import { ReactComponent as Home } from 'src/assets/svg/icons/Home.svg';
import { ReactComponent as Star } from 'src/assets/svg/icons/Star.svg';
import { ReactComponent as Eye } from 'src/assets/svg/icons/Eye.svg';

import FollowingChannels from './FollowingChannels';
import RecentChannels from './RecentChannels';
import { getSubscriptions } from 'src/redux/subscriptionsSlice';

interface Props {}

const Sidenav: React.FC<Props> = () => {
  const { authenticatedUser, isUserLoggedIn } = useContext(AuthContext);

  const dispatch = useDispatch();
  const channels = useSelector(
    (state: RootState) => state.subscriptions.channels,
  );

  useEffect(() => {
    if (authenticatedUser) dispatch(getSubscriptions(authenticatedUser));
  }, []);

  return (
    <SidenavContainer className="scroller">
      <SidenavLinks>
        <SidenavLink to="/" activeClassName="active" exact>
          <Home />
          <span>Página Inicial</span>
        </SidenavLink>
        {isUserLoggedIn && (
          <SidenavLink to="/subscriptions" activeClassName="active">
            <Star />
            <span>Inscrições</span>
          </SidenavLink>
        )}
        <SidenavLink to="/discover" activeClassName="active">
          <Eye />
          <span>Descobrir</span>
        </SidenavLink>
      </SidenavLinks>

      <SideNavDivider />

      {isUserLoggedIn && channels.length > 0 && <FollowingChannels />}
      {(!isUserLoggedIn || channels.length == 0) && <RecentChannels />}
    </SidenavContainer>
  );
};

export default Sidenav;
