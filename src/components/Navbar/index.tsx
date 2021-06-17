import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';

import Hexa from 'src/assets/svg/logos/Hexa.svg';
import { ReactComponent as Search } from 'src/assets/svg/icons/Search.svg';
import { ReactComponent as Moon } from 'src/assets/svg/icons/Moon.svg';
import { ReactComponent as Sun } from 'src/assets/svg/icons/Sun.svg';
import { ReactComponent as Profile } from 'src/assets/svg/icons/Profile.svg';

import {
  NavContainer,
  NavLogo,
  NavSearchForm,
  NavInputSearch,
  NavInputSeparetor,
  NavInputButton,
  NavIcons,
} from './styles';

interface Props {
  toggleTheme(): void;
}

const Navbar: React.FC<Props> = ({ toggleTheme }) => {
  const { colors, title } = useContext(ThemeContext);

  return (
    <NavContainer>
      <NavLogo>
        <Link to="/">
          <img src={Hexa} alt="Hexa Logo" />
        </Link>
      </NavLogo>

      <NavSearchForm>
        <NavInputSearch type="text" placeholder="Pesquisar..." />
        <NavInputSeparetor />
        <NavInputButton type="button">
          <Search />
        </NavInputButton>
      </NavSearchForm>

      <NavIcons>
        <span onClick={() => toggleTheme()}>
          {title === 'light' && <Moon fill={colors.icon} />}
          {title === 'dark' && <Sun fill={colors.icon} />}
        </span>
        <Profile fill={colors.icon} />
      </NavIcons>
    </NavContainer>
  );
};

export default Navbar;
