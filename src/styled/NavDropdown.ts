import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import { fadeIn } from './Keyframes';

const svgIcon = css`
  height: 40px;
  width: 40px;
  margin-right: 12px;
  fill: ${(props) => props.theme.colors.icon};
`;

const navdropdownItem = css`
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 8px 4px;
  font-size: ${(props) => props.theme.fontSizes.body.normal};
  color: ${(props) => props.theme.colors.text};
`;

export const NavDropdown = styled.div`
  background: ${(props) => props.theme.colors.nav};
  position: absolute;
  width: 264px;
  top: 48px;
  right: 0;
  padding: 8px;
  border-radius: 8px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  animation: ${fadeIn} 0.1s ease-in;
`;

export const NavDropdownLink = styled.div`
  user-select: none;

  a,
  div {
    ${navdropdownItem}

    svg {
      ${svgIcon}
    }

    &:hover {
      cursor: pointer;
      background-color: ${(props) =>
        transparentize(0.92, props.theme.colors.text)};
    }
  }
`;

export const NavDropdownSwitch = styled.div`
  ${navdropdownItem}
  justify-content: space-between;
  user-select: none;

  .navdropdown-block {
    display: flex;
    align-items: center;

    svg {
      ${svgIcon}
    }
  }
`;

export const NavDropdownDivider = styled.hr`
  border: none;
  height: 2px;
  width: calc(100% - 12px);
  margin: 0 auto;
  margin-bottom: 6px;
  margin-top: 6px;
  background-color: ${(props) => transparentize(0.92, props.theme.colors.text)};
`;
