import { invert, lighten, transparentize } from 'polished';
import styled from 'styled-components';

export const CoursePageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const CoursePageHeader = styled.div`
  display: flex;
  position: relative;

  h1 {
    margin-left: 6px;
    margin-bottom: 12px;
    font-size: ${(props) => props.theme.fontSizes.heading.normal};
    font-weight: 700;
  }
`;

export const CourseHeaderImage = styled.img`
  width: 180px;
  min-width: 180px;
  height: 180px;
  min-height: 180px;
  border-radius: 50%;
  background-color: ${(props) =>
    lighten(0.07, invert(props.theme.colors.text))};

  @media (max-width: ${(props) => props.theme.breakpoints.nav.tablet}) {
    display: none;
  }
`;

export const CourseHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 32px;
`;

export const CourseHeaderRate = styled.div`
  margin-top: 16px;

  svg {
    height: 40px;
    width: 40px;
    fill: ${(props) => transparentize(0.92, props.theme.colors.text)};
  }

  svg.active {
    fill: ${(props) => props.theme.commonColors.magenta};
  }
`;

export const CoursePageDetails = styled.div``;
export const CoursePageDetailsContent = styled.div``;
export const CoursePageDetailsInfo = styled.div``;
