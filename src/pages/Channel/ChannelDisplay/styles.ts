import styled from 'styled-components';

import { transparentize } from 'polished';

export const ChannelDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChannelBanner = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  object-position: center;
  background-color: ${(props) => transparentize(0.92, props.theme.colors.text)};
`;

export const ChannelSection = styled.div`
  position: relative;
  max-height: 92px;
  display: flex;
  justify-content: space-between;
  margin: 0 32px;
`;

export const ChannelHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const ChannelAuthorImage = styled.img`
  position: relative;
  top: -58px;
  background-color: ${(props) => props.theme.colors.text};
  width: 160px;
  min-width: 160px;
  height: 160px;
  min-height: 160px;
  border-radius: 50%;
  padding: 6px;
  object-fit: cover;
  object-position: center;
`;

export const ChannelInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 24px;
  align-self: flex-end;

  h1 {
    font-size: ${(props) => props.theme.fontSizes.heading.normal};
    font-weight: 700;
  }

  span {
    color: ${(props) => props.theme.colors.caption};
    font-size: ${(props) => props.theme.fontSizes.body.large};
    font-weight: 400;
  }
`;
