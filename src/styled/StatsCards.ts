import styled from 'styled-components';
import { lighten, invert } from 'polished';

export const StatsCards = styled.div`
  div {
    padding: 12px 16px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${(props) =>
      lighten(0.07, invert(props.theme.colors.text))};
    margin-top: 12px;

    span {
      margin-left: 20px;
      background: ${(props) => props.theme.gradients.primary};
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: ${(props) => props.theme.fontSizes.heading.small};
      font-weight: 700;
      letter-spacing: 0.5px;
    }
  }
`;
