import { useEffect } from 'react';
import { useState } from 'react';
import { RefObject, useRef } from 'react';
import {
  NavDropdownContainer,
  NavDropdownIcon,
  NavDropdownItem,
} from './styles';

interface Props {
  icon: any;
}

const NavDropdownMenu: React.FC<Props> = ({ icon, children }) => {
  const [open, setOpen] = useState(false);
  const dropdownEl: RefObject<HTMLDivElement> = useRef(null);

  function handleClick(e: any) {
    // Inside Click
    if (dropdownEl.current?.contains(e.target)) {
      return;
    }

    // Outside Click
    setOpen(false);
  }

  function handleChange() {
    setOpen(false);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <NavDropdownContainer ref={dropdownEl}>
      <NavDropdownIcon onClick={() => setOpen(!open)}>{icon}</NavDropdownIcon>
      {open && (
        <NavDropdownItem onClick={() => handleChange()}>
          {children}
        </NavDropdownItem>
      )}
    </NavDropdownContainer>
  );
};

export default NavDropdownMenu;
