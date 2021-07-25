import styled from 'styled-components';

export const FollowingChannelsContainer = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.nav.tablet}) {
    display: none;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.nav.mobile}) {
    display: none;
  }
`;

export const FollowingChannelsHeader = styled.div`
  margin-bottom: 12px;
  letter-spacing: 0.35px;
`;

export const NotFollowingAnyChannel = styled.div`
  margin-bottom: 12px;
`;

export const FollowingChannelsSection = styled.div`
  margin-bottom: 12px;
`;
