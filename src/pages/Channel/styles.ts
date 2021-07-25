import styled from 'styled-components';

export const ChannelContainer = styled.div``;

export const ChannelNavigation = styled.div`
  padding-top: 0px;

  @media (max-width: ${(props) => props.theme.breakpoints.nav.tablet}) {
    padding-top: 8px;
  }
`;
