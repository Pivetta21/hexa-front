import { useContext, useRef, RefObject } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from 'styled-components';

import nopic from 'src/assets/images/nopic.webp';

import { ReactComponent as Cog } from 'src/assets/svg/icons/Cog.svg';
import { ReactComponent as Moon } from 'src/assets/svg/icons/Moon.svg';
import { ReactComponent as Leave } from 'src/assets/svg/icons/Leave.svg';
import { ReactComponent as Profile } from 'src/assets/svg/icons/Profile.svg';

import {
  NavDropdown,
  NavDropdownLink,
  NavDropdownSwitch,
  NavDropdownDivider,
} from 'src/styled/NavDropdown';

import {
  ProfileMenuContainer,
  ProfileMenuIcon,
  ProfileMenuImage,
} from './styles';

import Switch from 'src/components/Switch';

import AuthContext from 'src/providers/AuthContext';
import ThemeToggleContext from 'src/providers/ThemeToggleContext';
import useOutsideClick from 'src/hooks/useOutsideClick';

interface Props {}

const ProfileMenu: React.FC<Props> = () => {
  const { isUserLoggedIn, logout } = useContext(AuthContext);

  const { toggleTheme } = useContext(ThemeToggleContext);
  const { colors, title } = useContext(ThemeContext);

  const dropdownEl: RefObject<HTMLDivElement> = useRef(null);
  const [open, setOpen] = useOutsideClick(dropdownEl, false);

  function handleLogout() {
    logout();

    setOpen(false);
  }

  return (
    <ProfileMenuContainer className="navmenu-item" ref={dropdownEl}>
      {!isUserLoggedIn && (
        <ProfileMenuIcon onClick={() => setOpen(!open)}>
          <Profile fill={colors.icon} />
        </ProfileMenuIcon>
      )}

      {open && !isUserLoggedIn && (
        <NavDropdown>
          <NavDropdownSwitch>
            <div className="navdropdown-block">
              <Moon fill={colors.icon} />
              <span>Tema escuro</span>
            </div>
            <Switch
              name="toggleTheme"
              onChecked={toggleTheme}
              checked={title === 'dark' ? true : false}
            />
          </NavDropdownSwitch>

          <NavDropdownDivider />

          <NavDropdownLink onClick={() => setOpen(!open)}>
            <div className="navdropdown-block">
              <Leave
                fill={colors.icon}
                transform="rotate(180) translate(-4.5 0)"
              />
              <span>Entrar</span>
            </div>
          </NavDropdownLink>
        </NavDropdown>
      )}

      {isUserLoggedIn && (
        <ProfileMenuImage onClick={() => setOpen(!open)}>
          <img src={nopic} aria-label="Sua foto de perfil" />
        </ProfileMenuImage>
      )}

      {open && isUserLoggedIn && (
        <NavDropdown>
          <NavDropdownLink onClick={() => setOpen(false)}>
            <Link to="/profile" className="navdropdown-block">
              <Profile fill={colors.icon} />
              <span>Perfil</span>
            </Link>
          </NavDropdownLink>

          <NavDropdownLink onClick={() => setOpen(false)}>
            <Link to="/config" className="navdropdown-block">
              <Cog fill={colors.icon} />
              <span>Configurações</span>
            </Link>
          </NavDropdownLink>

          <NavDropdownSwitch>
            <div className="navdropdown-block">
              <Moon fill={colors.icon} />
              <span>Tema escuro</span>
            </div>
            <Switch
              name="toggleTheme"
              onChecked={toggleTheme}
              checked={title === 'dark' ? true : false}
            />
          </NavDropdownSwitch>

          <NavDropdownDivider />

          <NavDropdownLink onClick={() => handleLogout()}>
            <div className="navdropdown-block">
              <Leave fill={colors.icon} />
              <span>Sair</span>
            </div>
          </NavDropdownLink>
        </NavDropdown>
      )}
    </ProfileMenuContainer>
  );
};

export default ProfileMenu;
