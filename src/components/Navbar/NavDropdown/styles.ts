import styled from 'styled-components';

export const NavDropdownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-left: 4px;

  &:first-child {
    margin-left: 0;
  }
`;

export const NavDropdownIcon = styled.div`
  display: flex;
  align-items: center;
`;

export const NavDropdownItem = styled.div`
  background: #202020;
  position: absolute;
  width: 264px;
  top: 48px;
  right: 0;
  padding: 8px;
  border-radius: 8px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);

  a,
  div {
    display: flex;
    align-items: center;
    border-radius: 6px;
    padding: 8px 4px;
    font-size: 16px;
    color: #ededed;

    svg {
      height: 40px;
      width: 40px;
      margin-right: 12px;
    }

    &:hover {
      background-color: #333;
    }
  }
`;
