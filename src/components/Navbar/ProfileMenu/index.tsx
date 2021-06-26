import { useState, useContext, useEffect, useRef, RefObject } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from 'styled-components';

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

import Switch from 'src/components/Switch';

import { ProfileMenuContainer, ProfileMenuIcon } from './styles';
import ThemeToggleContext from 'src/providers/ThemeToggleContext';

interface Props {}

const ProfileMenu: React.FC<Props> = () => {
  const { colors, title } = useContext(ThemeContext);
  const { toggleTheme } = useContext(ThemeToggleContext);

  const [open, setOpen] = useState(false);
  const dropdownEl: RefObject<HTMLDivElement> = useRef(null);

  function logout() {
    // Realizar logout...
    setOpen(false);
  }

  function handleOutsideClick(e: any) {
    if (dropdownEl.current?.contains(e.target)) {
      return;
    }
    setOpen(false);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <ProfileMenuContainer className="navmenu-item" ref={dropdownEl}>
      <ProfileMenuIcon onClick={() => setOpen(!open)}>
        <Profile fill={colors.icon} />
      </ProfileMenuIcon>

      {open && (
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

          <NavDropdownLink onClick={() => logout()}>
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
