import { Link } from 'react-router-dom';

import Hexa from 'src/assets/svg/logos/Hexa.svg';

import { ReactComponent as Search } from 'src/assets/svg/icons/Search.svg';
import { ReactComponent as Bell } from 'src/assets/svg/icons/Bell.svg';
import { ReactComponent as Download } from 'src/assets/svg/icons/Download.svg';

import {
  NavContainer,
  NavLogo,
  NavSearchForm,
  NavInputSearch,
  NavInputSeparetor,
  NavInputButton,
  NavMenu,
} from './styles';

import ProfileMenu from './ProfileMenu';

interface Props {}

const Navbar: React.FC<Props> = () => {
  return (
    <NavContainer>
      <NavLogo>
        <Link to="/">
          <img src={Hexa} alt="Hexa Logo" style={{ userSelect: 'none' }} />
        </Link>
      </NavLogo>

      <NavSearchForm>
        <NavInputSearch type="text" placeholder="Pesquisar..." />
        <NavInputSeparetor />
        <NavInputButton type="button">
          <Search />
        </NavInputButton>
      </NavSearchForm>

      <NavMenu>
        <Download className="navmenu-item navmenu-icon" />
        <Bell className="navmenu-item navmenu-icon" />
        <ProfileMenu />
      </NavMenu>
    </NavContainer>
  );
};

export default Navbar;
