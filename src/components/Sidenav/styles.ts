import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { invert, transparentize } from 'polished';

export const SidenavContainer = styled.nav`
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 1;
  height: 100%;
  width: 278px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${(props) => props.theme.colors.nav};
  border-right: 1px solid
    ${(props) => transparentize(0.25, invert(props.theme.colors.text))};

  @media (max-width: 900px) {
    width: 80px;
  }

  @media (max-width: 500px) {
    overflow-y: hidden;
    top: auto;
    bottom: 0;
    width: 100%;
    height: 60px;
    border-right: none;
    border-top: 1px solid
      ${(props) => transparentize(0.25, invert(props.theme.colors.text))};
  }
`;

export const SidenavLinks = styled.div`
  display: grid;
  padding: ${(props) => props.theme.spacings.medium};

  @media (max-width: 900px) {
    padding: ${(props) => props.theme.spacings.normal} 0;
    justify-content: center;

    span {
      display: none;
    }
  }

  @media (max-width: 500px) {
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
