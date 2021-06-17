import styled from 'styled-components';
import { darken } from 'polished';

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes.heading.small};
  font-weight: 700;

  img {
    width: 40%;

    @media (max-width: 1300px) {
      width: 55%;
    }

    @media (max-width: 800px) {
      width: 80%;
    }
  }

  a {
    margin: 32px 0;
    padding: 10px 24px;
    background-color: ${(props) => props.theme.commonColors.magenta};
    border-radius: 4px;
    color: ${(props) => props.theme.commonColors.white};

    &:hover {
      background-color: ${(props) =>
        darken(0.05, props.theme.commonColors.magenta)};
    }
  }
`;
