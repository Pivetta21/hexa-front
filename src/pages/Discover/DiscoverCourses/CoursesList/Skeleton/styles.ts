import styled from 'styled-components';
import { transparentize } from 'polished';

export const CoursesListContainerSk = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-template-rows: 1fr 1fr;
  row-gap: 20px;
  column-gap: 16px;

  @media (max-width: ${(props) => props.theme.breakpoints.nav.mobile}) {
    display: flex;
    flex-direction: column;
  }
`;

export const CourseItemContainerSk = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  user-select: none;
  pointer-events: none;
`;

export const CourseItemImageSk = styled.div`
  min-width: 100%;
  height: 200px;
  min-height: 200px;
  background-color: ${(props) => transparentize(0.92, props.theme.colors.text)};
`;

export const CourseItemAuthorSk = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 16px;
  margin-top: 12px;

  .img {
    background-color: ${(props) =>
      transparentize(0.92, props.theme.colors.text)};
    height: 64px;
    min-height: 64px;
    width: 64px;
    min-width: 64px;
    border-radius: 50%;
  }
`;

export const CourseItemAuthorInfoSk = styled.div`
  width: 100%;
  h1 {
    height: 14px;
    width: 80%;
    background-color: ${(props) =>
      transparentize(0.92, props.theme.colors.text)};
    margin-bottom: 12px;
  }

  p {
    height: 10px;
    width: 60%;

    background-color: ${(props) =>
      transparentize(0.92, props.theme.colors.text)};
  }
`;
