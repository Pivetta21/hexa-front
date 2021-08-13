import styled from 'styled-components';

export const ChannelAboutContainer = styled.div`
  margin-top: 20px;

  display: flex;
  justify-content: space-between;

  h1 {
    font-size: ${(props) => props.theme.fontSizes.body.medium};
    font-weight: 600;
    letter-spacing: 0.5px;
  }
`;

export const ChannelAboutDescription = styled.div`
  margin-right: 60px;

  p {
    margin-top: 12px;
  }

  span {
    display: block;
    margin-top: 32px;
    color: ${(props) => props.theme.colors.caption};
  }
`;

export const ChannelAboutStats = styled.div`
  min-width: 230px;
`;
