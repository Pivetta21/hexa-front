import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 64px;

  @media (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    column-gap: 0px;
    row-gap: 32px;
  }
`;

export const ProfileInfo = styled.div`
  img {
    width: 120px;
    min-width: 120px;
    height: 120px;
    min-height: 120px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
  }

  h1 {
    font-size: ${(props) => props.theme.fontSizes.heading.small};
    font-weight: 600;
    margin-bottom: 4px;
  }

  p {
    font-size: ${(props) => props.theme.fontSizes.body.normal};
    margin-bottom: 16px;
  }

  > div {
    font-size: ${(props) => props.theme.fontSizes.body.normal};
    color: ${(props) => props.theme.colors.caption};
    margin-top: 24px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.nav.mobile}) {
    width: 100%;
  }
`;

export const ProfileStats = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 48px;
`;
