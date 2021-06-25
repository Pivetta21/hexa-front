import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { invert, transparentize } from 'polished';

export const SidenavContainer = styled.nav`
  grid-area: sidenav;
  position: fixed;
  padding: ${(props) => props.theme.spacings.medium};
  bottom: 0;
  left: 0;
  z-index: 1;
  height: calc(100% - ${(props) => props.theme.sizes.nav.navbarHeight});
  width: ${(props) => props.theme.sizes.nav.sidenavWeb};
  background-color: ${(props) => props.theme.colors.nav};
  border-right: 1px solid
    ${(props) => transparentize(0.25, invert(props.theme.colors.text))};

  @media (max-width: ${(props) => props.theme.breakpoints.nav.tablet}) {
    padding: ${(props) => props.theme.spacings.normal} 0;
    width: ${(props) => props.theme.sizes.nav.sidenavTablet};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.nav.mobile}) {
    padding: 0;
    width: 100%;
    height: ${(props) => props.theme.sizes.nav.sidenavMobile};
    border-right: none;
    border-top: 1px solid
      ${(props) => transparentize(0.25, invert(props.theme.colors.text))};
  }
`;

export const SidenavLinks = styled.div`
  display: grid;

  @media (max-width: ${(props) => props.theme.breakpoints.nav.tablet}) {
    justify-content: center;

    span {
      display: none;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.nav.mobile}) {
    grid-auto-flow: column;
    height: 100%;
    padding: 0 ${(props) => props.theme.spacings.normal};

    a {
      margin-bottom: 0;
      margin-right: ${(props) => props.theme.spacings.medium};
    }
  }
`;

export const SidenavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: ${(props) => props.theme.spacings.normal};

  &:last-child {
    margin: 0;
  }

  span {
    color: ${(props) => props.theme.colors.text};
    margin-left: ${(props) => props.theme.spacings.small};
    font-size: ${(props) => props.theme.fontSizes.body.medium};
    font-weight: 600;
  }

  svg {
    fill: ${(props) => props.theme.colors.text};
    height: 42px;
    width: 42px;
  }

  &.active,
  &:hover {
    cursor: pointer;

    span {
      color: ${(props) => props.theme.commonColors.magenta};
    }

    svg {
      fill: ${(props) => props.theme.commonColors.magenta};
    }
  }
`;
