import styled from 'styled-components';

export const RecentChannelsContainer = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.nav.mobile}) {
    display: none;
  }
`;

export const RecentChannelsHeader = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.nav.tablet}) {
    display: none;
  }

  margin-bottom: 12px;
  letter-spacing: 0.35px;
`;

export const RecentChannelsContent = styled.div`
  margin-bottom: 12px;
`;
