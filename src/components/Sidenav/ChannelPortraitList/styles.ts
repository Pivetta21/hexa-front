import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ChannelPortraitListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChannelPortraitItem = styled(Link)`
  display: flex;
  align-items: center;
  margin: 12px 0;
  color: ${(props) => props.theme.colors.text};

  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }

  img {
    width: 50px;
    min-width: 50px;
    height: 50px;
    min-height: 50px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.nav.tablet}) {
    justify-content: center;
  }
`;

export const ChannelPortraitBody = styled.div`
  position: relative;
  margin-left: 16px;
  overflow: hidden;

  h1 {
    position: relative;
    top: -2px;
    letter-spacing: 0.5px;
    font-weight: 600;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    white-space: nowrap;
    overflow: hidden;
  }

  div {
    position: relative;
    top: -1px;
    font-size: ${(props) => props.theme.fontSizes.body.small};
    color: ${(props) => props.theme.colors.caption};
    letter-spacing: 0.35px;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    white-space: nowrap;
    overflow: hidden;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.nav.tablet}) {
    display: none;
  }
`;
