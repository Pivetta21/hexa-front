import { useContext } from 'react';
import { useSelector } from 'react-redux';

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

interface Props {}

const Sidenav: React.FC<Props> = () => {
  const { isUserLoggedIn } = useContext(AuthContext);

  const channels = useSelector(
    (state: RootState) => state.subscriptions.channels,
  );

  return (
    <SidenavContainer className="scroller">
      <SidenavLinks>
        <SidenavLink to="/" activeClassName="active" exact>
          <Home />
          <span>Página Inicial</span>
        </SidenavLink>
        <SidenavLink to="/subscriptions" activeClassName="active">
          <Star />
          <span>Inscrições</span>
        </SidenavLink>
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
