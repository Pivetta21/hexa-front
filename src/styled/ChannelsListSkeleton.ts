import styled from 'styled-components';
import { transparentize } from 'polished';

export const ChannelsListContainerSk = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  row-gap: 20px;
  column-gap: 16px;

  @media (max-width: ${(props) => props.theme.breakpoints.nav.mobile}) {
    display: flex;
    flex-direction: column;
  }
`;

export const ChannelItemContainerSk = styled.div`
  display: flex;
  width: 100%;
  height: 180px;
  padding: 16px;
  background-color: ${(props) => transparentize(0.92, props.theme.colors.text)};
  border-radius: 8px;
  user-select: none;
  pointer-events: none;
`;

export const ChannelItemImageSk = styled.div`
  &.img {
    width: 74px;
    min-width: 74px;
    height: 74px;
    min-height: 74px;
    border-radius: 50%;
    background-color: ${(props) =>
      transparentize(0.92, props.theme.colors.text)};
  }
`;

export const ChannelItemHeaderSk = styled.div`
  margin-left: 16px;
  width: 100%;
  height: 100%;

  h1 {
    height: 15px;
    width: 70%;
    background-color: ${(props) =>
      transparentize(0.92, props.theme.colors.text)};
    border-radius: 4px;
  }

  div {
    height: 15px;
    width: 40%;
    background-color: ${(props) =>
      transparentize(0.92, props.theme.colors.text)};
    margin-top: 8px;
    border-radius: 4px;
  }

  p {
    height: 96px;
    width: 100%;
    background-color: ${(props) =>
      transparentize(0.92, props.theme.colors.text)};
    margin-top: 16px;
    border-radius: 4px;
  }
`;
