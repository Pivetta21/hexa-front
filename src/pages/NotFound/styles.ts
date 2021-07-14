import styled from 'styled-components';

import { darken } from 'polished';

export const NotFoundContainer = styled.div``;

export const NotFoundImage = styled.div`
  display: flex;

  img {
    pointer-events: none;
    width: 38%;
    max-width: 100%;
    height: auto;
    margin: 0 auto;
  }
`;

export const NotFoundText = styled.div`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.heading.small};
  padding-top: 60px;

  a {
    font-weight: 700;
    color: ${(props) => props.theme.commonColors.magenta};

    &:hover {
      color: ${(props) => darken(0.05, props.theme.commonColors.magenta)};
    }
  }
`;
