import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from 'src/providers/AuthContext';

import Hexa from 'src/assets/svg/logos/Hexa.svg';

import { ReactComponent as Search } from 'src/assets/svg/icons/Search.svg';
import { ReactComponent as Bell } from 'src/assets/svg/icons/Bell.svg';
import { ReactComponent as Channel } from 'src/assets/svg/icons/Channel.svg';

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

import Login from '../Login';

interface Props {}

const Navbar: React.FC<Props> = () => {
  const { isUserLoggedIn } = useContext(AuthContext);

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
        {isUserLoggedIn && (
          <>
            <Channel className="navmenu-item navmenu-icon" />
            <Bell className="navmenu-item navmenu-icon" />
          </>
        )}

        {!isUserLoggedIn && <Login />}

        <ProfileMenu />
      </NavMenu>
    </NavContainer>
  );
};

export default Navbar;
