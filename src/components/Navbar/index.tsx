import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';

import Hexa from 'src/assets/svg/logos/Hexa.svg';

import { ReactComponent as Search } from 'src/assets/svg/icons/Search.svg';

import { ReactComponent as Profile } from 'src/assets/svg/icons/Profile.svg';
import { ReactComponent as Cog } from 'src/assets/svg/icons/Cog.svg';
import { ReactComponent as Moon } from 'src/assets/svg/icons/Moon.svg';
import { ReactComponent as Leave } from 'src/assets/svg/icons/Leave.svg';

import {
  NavContainer,
  NavLogo,
  NavSearchForm,
  NavInputSearch,
  NavInputSeparetor,
  NavInputButton,
  NavMenu,
} from './styles';

import NavDropdown from './NavDropdown';
import Switch from '../Switch';

interface Props {
  toggleTheme(): void;
}

const Navbar: React.FC<Props> = ({ toggleTheme }) => {
  const { colors } = useContext(ThemeContext);

  function logout() {
    console.log('Realizando Logout!');
  }

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
        <Switch name="toggleTheme" onChecked={toggleTheme}></Switch>
        <NavDropdown icon={<Profile fill={colors.icon} />}>
          <Link to="/profile">
            <Profile fill={colors.icon} />
            <span>Perfil</span>
          </Link>
          <Link to="/config">
            <Cog fill={colors.icon} />
            <span>Configurações</span>
          </Link>
          <Link to="/theme">
            <Moon fill={colors.icon} />
            <span>Tema escuro</span>
          </Link>
          <div onClick={() => logout()}>
            <Leave fill={colors.icon} />
            <span>Sair</span>
          </div>
        </NavDropdown>
      </NavMenu>
    </NavContainer>
  );
};

export default Navbar;
