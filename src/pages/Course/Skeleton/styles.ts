import { invert, lighten } from 'polished';
import styled from 'styled-components';

export const CoursePageContainerSk = styled.div`
  display: flex;
  justify-content: center;
`;

export const CoursePageHeaderSk = styled.div`
  display: flex;
  position: relative;

  h1 {
    margin-bottom: 12px;
    border-radius: 4px;
    height: 16px;
    width: 300px;
    background-color: ${(props) =>
      lighten(0.07, invert(props.theme.colors.text))};
  }
`;

export const CourseHeaderImageSk = styled.div`
  width: 160px;
  min-width: 160px;
  height: 160px;
  min-height: 160px;
  border-radius: 50%;
  background-color: ${(props) =>
    lighten(0.07, invert(props.theme.colors.text))};

  @media (max-width: ${(props) => props.theme.breakpoints.nav.tablet}) {
    display: none;
  }
`;

export const CourseHeaderInfoSk = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 32px;
`;

export const CourseHeaderRateSk = styled.div`
  height: 30px;
  width: 200px;
  margin-top: 32px;
  border-radius: 12px;
  background-color: ${(props) =>
    lighten(0.07, invert(props.theme.colors.text))};
`;
