import { SidenavContainer, SidenavLinks, SidenavLink } from './styles';

import { ReactComponent as Home } from 'src/assets/svg/icons/Home.svg';
import { ReactComponent as Start } from 'src/assets/svg/icons/Start.svg';
import { ReactComponent as Eye } from 'src/assets/svg/icons/Eye.svg';

interface Props {}

const Sidenav: React.FC<Props> = () => {
  return (
    <SidenavContainer className="scroller">
      <SidenavLinks>
        <SidenavLink to="/" activeClassName="active" exact>
          <Home />
          <span>Página Inicial</span>
        </SidenavLink>
        <SidenavLink to="/subscriptions" activeClassName="active">
          <Start />
          <span>Inscrições</span>
        </SidenavLink>
        <SidenavLink to="/discover" activeClassName="active">
          <Eye />
          <span>Descobrir</span>
        </SidenavLink>
      </SidenavLinks>
    </SidenavContainer>
  );
};

export default Sidenav;
