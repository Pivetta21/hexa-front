import styled from 'styled-components';
import { transparentize } from 'polished';

export const ChannelPortraitListContainerSk = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChannelPortraitImageSk = styled.div`
  content: ' ';
  background-color: ${(props) => transparentize(0.92, props.theme.colors.text)};
  width: 50px;
  min-width: 50px;
  height: 50px;
  min-height: 50px;
  border-radius: 50%;
`;

export const ChannelPortraitItemSk = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0;
  color: ${(props) => props.theme.colors.text};

  @media (max-width: ${(props) => props.theme.breakpoints.nav.tablet}) {
    justify-content: center;
  }
`;

export const ChannelPortraitBodySk = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;

  h1 {
    content: ' ';
    width: 130px;
    height: 10px;
    border-radius: 4px;
    background-color: ${(props) =>
      transparentize(0.92, props.theme.colors.text)};
    margin-bottom: 10px;
  }

  div {
    content: ' ';
    width: 100px;
    height: 8px;
    border-radius: 4px;
    background-color: ${(props) =>
      transparentize(0.92, props.theme.colors.text)};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.nav.tablet}) {
    display: none;
  }
`;
