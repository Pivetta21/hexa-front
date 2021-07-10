import styled from 'styled-components';

export const LoginOverlayContainer = styled.div`
  h1 {
    font-size: ${(props) => props.theme.fontSizes.body.medium};
    font-weight: 700;
    color: ${(props) => props.theme.commonColors.magenta};
    margin-bottom: 12px;
  }
`;

export const LoginNav = styled.div`
  display: flex;
  margin-bottom: 16px;
  position: relative;

  &::after {
    position: absolute;
    bottom: 0;
    z-index: 998;
    content: '';
    width: 100%;
    height: 1px;
    background-color: rgba(132, 132, 140, 0.2);
  }
`;

export const LoginNavLink = styled.div`
  z-index: 999;
  font-size: ${(props) => props.theme.fontSizes.body.normal};
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-left: 12px;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    cursor: pointer;
  }

  &.active {
    font-weight: 700;
    color: ${(props) => props.theme.commonColors.magenta};
    border-bottom: 2px solid ${(props) => props.theme.commonColors.magenta};
  }
`;
