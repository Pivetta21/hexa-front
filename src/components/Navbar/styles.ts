import styled from 'styled-components';
import { darken } from 'polished';

export const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 60px;
  background-color: ${(props) => props.theme.colors.nav};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${(props) => props.theme.spacings.medium};
  box-shadow: ${(props) => props.theme.shadows.primary};
`;

export const NavLogo = styled.div`
  display: flex;
`;

export const NavSearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 900px) {
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
    color: ${(props) => props.theme.commonColors.lightGray};
  }
`;

export const NavInputSeparetor = styled.span`
  position: absolute;
  right: 48px;
  width: 2px;
  height: 28px;
  background-color: ${(props) => props.theme.commonColors.gray};
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
    fill: ${(props) => props.theme.commonColors.lightGray};
    stroke: ${(props) => props.theme.commonColors.lightGray};
  }
`;

export const NavIcons = styled.div`
  display: flex;
  justify-items: center;
  align-content: center;

  svg {
    height: 42px;
    width: 42px;
    margin-left: ${(props) => props.theme.spacings.xSmall};

    &:hover {
      cursor: pointer;
    }

    &:first-child {
      margin-left: 0px;
    }
  }
`;
