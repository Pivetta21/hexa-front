import styled from 'styled-components';

export const FollowingChannelsContainer = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.nav.mobile}) {
    display: none;
  }
`;

export const FollowingChannelsHeader = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.nav.tablet}) {
    display: none;
  }

  margin-bottom: 12px;
  letter-spacing: 0.35px;
`;

export const FollowingChannelsContent = styled.div`
  margin-bottom: 12px;
`;
