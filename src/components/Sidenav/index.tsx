import { useContext } from 'react';

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
import AuthContext from 'src/providers/AuthContext';

interface Props {}

const Sidenav: React.FC<Props> = () => {
  const { isUserLoggedIn } = useContext(AuthContext);

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

      {isUserLoggedIn && <FollowingChannels />}
    </SidenavContainer>
  );
};

export default Sidenav;
