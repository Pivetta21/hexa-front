import { transparentize } from 'polished';
import styled from 'styled-components';

export const ChannelsListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  row-gap: 16px;
  column-gap: 16px;
`;

export const ChannelContainer = styled.div`
  display: flex;
  width: 100%;
  height: 180px;
  padding: 16px;
  background-color: ${(props) => transparentize(0.92, props.theme.colors.text)};
  border-radius: 8px;

  :hover {
    cursor: pointer;
    box-shadow: ${(props) => props.theme.shadows.primary};
  }
`;

export const ChannelImage = styled.img`
  width: 74px;
  height: 74px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  background-color: ${(props) => transparentize(0.92, props.theme.colors.text)};
`;

export const ChannelHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  overflow: hidden;

  h1 {
    font-weight: 600;
    color: ${(props) => props.theme.colors.text};
    font-size: ${(props) => props.theme.fontSizes.body.medium};
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    white-space: nowrap;
    overflow: hidden;
    letter-spacing: 0.35px;
  }

  span {
    margin-top: 4px;
    margin-bottom: 12px;
    color: ${(props) => props.theme.colors.caption};
    text-transform: uppercase;
  }

  p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: ${(props) => props.theme.colors.text};
    letter-spacing: 0.35px;
  }
`;
