import { RefObject } from 'react';
import { useRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import ThemeToggleContext from 'src/providers/ThemeToggleContext';
import useOutsideClick from 'src/hooks/useOutsideClick';

import Switch from 'src/components/Switch';
import {
  NavDropdown,
  NavDropdownDivider,
  NavDropdownLink,
  NavDropdownSwitch,
} from 'src/styled/NavDropdown';

import { ReactComponent as Moon } from 'src/assets/svg/icons/Moon.svg';
import { ReactComponent as Leave } from 'src/assets/svg/icons/Leave.svg';
import { ReactComponent as Profile } from 'src/assets/svg/icons/Profile.svg';

import { ProfileGuestContainer, ProfileMenuIcon } from './styles';
import LoginOverlayContext from 'src/providers/LoginOverlayContext';

interface Props {}

const ProfileGuest: React.FC<Props> = () => {
  const { openSignIn } = useContext(LoginOverlayContext);

  const { toggleTheme } = useContext(ThemeToggleContext);
  const { colors, title } = useContext(ThemeContext);

  const dropdownEl: RefObject<HTMLDivElement> = useRef(null);
  const [open, setOpen] = useOutsideClick(dropdownEl, false);

  function onSignInClick() {
    setOpen(!open);
    openSignIn();
  }

  return (
    <ProfileGuestContainer className="navmenu-item" ref={dropdownEl}>
      <ProfileMenuIcon onClick={() => setOpen(!open)}>
        <Profile fill={colors.icon} />
      </ProfileMenuIcon>

      {open && (
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

          <NavDropdownLink onClick={() => onSignInClick()}>
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
    </ProfileGuestContainer>
  );
};

export default ProfileGuest;
