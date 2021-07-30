import styled from 'styled-components';
import { lighten, invert } from 'polished';

export const ProfileStatsSection = styled.div`
  position: relative;

  h1 {
    width: 300px;
    height: 16px;
    background-color: ${(props) =>
      lighten(0.07, invert(props.theme.colors.text))};
  }

  p {
    float: right;
    width: 100px;
    height: 10px;
    background-color: ${(props) =>
      lighten(0.07, invert(props.theme.colors.text))};
  }
`;

export const ProfileStatsSectionGrid = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  margin: 12px 0;

  div {
    width: 394px;
    height: 100px;
    background-color: ${(props) =>
      lighten(0.07, invert(props.theme.colors.text))};
  }
`;
