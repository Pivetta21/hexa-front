import styled from 'styled-components';
import { darken } from 'polished';

export const NavContainer = styled.nav`
  grid-area: navbar;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: ${(props) => props.theme.sizes.nav.navbarHeight};
  background-color: ${(props) => props.theme.colors.nav};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${(props) => props.theme.spacings.medium};
  box-shadow: ${(props) => props.theme.shadows.primary};

  @media (max-width: ${(props) => props.theme.breakpoints.nav.tablet}) {
    padding: 0 ${(props) => props.theme.spacings.normal};
  }
`;

export const NavLogo = styled.div`
  display: flex;
`;

export const NavSearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: ${(props) => props.theme.breakpoints.nav.tablet}) {
    display: none;
  }
`;

export const NavInputSearch = styled.input`
  width: 360px;
  height: 40px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 60px;
  font-size: ${(props) => props.theme.fontSizes.body.normal};
  background-color: ${(props) => props.theme.commonColors.silver};
  color: ${(props) => props.theme.commonColors.darkGray};
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${(props) => props.theme.commonColors.gray};
  }
`;

export const NavInputDivider = styled.span`
  position: absolute;
  right: 48px;
  width: 2px;
  height: 28px;
  background-color: ${(props) => props.theme.commonColors.lightGray};
`;

export const NavInputButton = styled.button`
  position: absolute;
  right: 0;
  height: 40px;
  border-radius: 0 20px 20px 0;
  padding: 0 12px 0 8px;
  background: none;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      darken(0.1, props.theme.commonColors.lightSilver)};
  }

  svg {
    width: 28px;
    height: 28px;
    fill: ${(props) => props.theme.commonColors.gray};
    stroke: ${(props) => props.theme.commonColors.gray};
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  .navmenu-item {
    margin-left: 8px;

    &:first-child {
      margin-left: 0;
    }
  }

  .navmenu-icon {
    fill: ${(props) => props.theme.colors.icon};
    height: 40px;
    width: 40px;

    &:hover {
      cursor: pointer;
    }
  }
`;
