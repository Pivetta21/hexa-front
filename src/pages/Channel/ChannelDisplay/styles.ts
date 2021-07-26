import styled from 'styled-components';

import { transparentize } from 'polished';

export const ChannelDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChannelBanner = styled.img`
  pointer-events: none;
  user-select: none;
  width: 100%;
  height: 200px;
  min-height: 200px;
  object-fit: cover;
  object-position: center;
  background-color: ${(props) => transparentize(0.92, props.theme.colors.text)};
`;

export const ChannelSection = styled.div`
  position: relative;
  top: -20px;
  display: flex;
  justify-content: space-between;
  margin: 0 ${(props) => props.theme.spacings.medium};

  @media (max-width: 1200px) {
    top: 0;
    padding: 16px 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.nav.tablet}) {
    margin: 0 ${(props) => props.theme.spacings.normal};
    padding: 8px 0;
  }
`;

export const ChannelHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const ChannelAuthorImage = styled.img`
  pointer-events: none;
  user-select: none;
  background-color: ${(props) => props.theme.colors.text};
  width: 110px;
  min-width: 110px;
  height: 110px;
  min-height: 110px;
  border-radius: 50%;
  padding: 4px;
  object-fit: cover;
  object-position: center;
  margin-right: 16px;

  @media (max-width: 1200px) {
    width: 80px;
    min-width: 80px;
    height: 80px;
    min-height: 80px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.nav.tablet}) {
    display: none;
    margin-right: 0px;
  }
`;

export const ChannelInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: ${(props) => props.theme.fontSizes.heading.small};
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  span {
    color: ${(props) => props.theme.colors.caption};
    font-size: ${(props) => props.theme.fontSizes.body.medium};
    font-weight: 400;
    letter-spacing: 0.35px;
  }

  button {
    letter-spacing: 0.5px;
  }
`;

export const ChannelDisplayActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    fill: ${(props) => props.theme.colors.icon};
    width: 40px;
    height: 40px;
    margin-right: 12px;

    &:hover {
      cursor: pointer;
    }
  }
`;
